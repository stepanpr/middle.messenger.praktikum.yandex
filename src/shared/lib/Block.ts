import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

const enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

type Props = Record<string, any>;

class Block {
    eventBus: EventBus;
    tagName: string;
    props: Props;
    private _element: HTMLElement;
    children: Record<string, any>;
    id: string;

    constructor(tagName = 'div', propsAndChildren: Record<string, any> = {}) {
        const { children, props } = this._getChildren(propsAndChildren);
        this.children = children;
        //создаём Event Bus
        this.eventBus = new EventBus();
        this.id = makeUUID();
        //создаём Proxy-объекты
        this.props = this._makePropsProxy({ ...props, id: this.id });
        this.tagName = tagName;
        this._registerEvents();
        this.eventBus.emit(Events.INIT);
    }

    // Регистрация событий, подписка на изменения
    private _registerEvents() {
        this.eventBus.on(Events.INIT, this.init.bind(this));
        this.eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        this._element = this._createDocumentElement(this.tagName);
    }

    init() {
        this._createResources();
        this.eventBus.emit(Events.FLOW_RENDER);
    }

    private _componentDidMount(oldProps: Props) {
        this.componentDidMount(oldProps);
        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((item) => {
                    item.dispatchComponentDidMount();
                });
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        this.componentDidUpdate(oldProps, newProps);
        this.eventBus.emit(Events.FLOW_RENDER);
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        const { children, props } = this._getChildren(nextProps);
        Object.assign(this.children, children);
        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    componentDidMount(oldProps: Props) {}

    dispatchComponentDidMount() {
        this.eventBus.emit(Events.FLOW_CDM);
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        return true;
    }

    private _render() {
        const fragment = this.render();
        const element = fragment.firstElementChild as HTMLElement;
        this._removeEventListeners();
        this._element.innerHTML = '';
        this._element.replaceWith(element);
        this._element = element;
        this._addEventListeners();
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props: any) {
        const proxyProps = new Proxy(props, {
            get: (target, prop: string) => {
                if (prop.startsWith('_')) {
                    throw new Error('нет доступа');
                } else {
                    const value = target[prop];

                    return typeof value === 'function' ? value.bind(target) : value;
                }
            },
            set: (target, prop: string, value) => {
                if (prop.startsWith('_')) {
                    throw new Error('нет доступа');
                } else {
                    target[prop] = value;

                    this.eventBus.emit(Events.FLOW_CDU, target);
                    return true;
                }
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });

        return proxyProps;
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }

    remove() {
        this.getContent().remove();
    }

    private _addEventListeners() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEventListeners() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName) as HTMLElement;
        return element;
    }

    compile(template: any, props: any) {
        const propsAndStubs = { ...props };
        Object.entries(this.children).forEach(([key, child]) => {
            //добавляем заглушки в объект с пропсами
            if (Array.isArray(child)) {
                propsAndStubs[key] = [];
                child.forEach((item) => {
                    propsAndStubs[key].push({
                        [key]: `<div data-id="${item.id}"></div>`,
                    });
                });
            } else {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
            }
        });

        // Временный контейнер.
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((item) => {
                    const stub = fragment.content.querySelector(`[data-id="${item.id}"]`);

                    if (stub) stub.replaceWith(item.getContent());
                });
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
                if (stub) stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    private _getChildren(propsAndChildren: any) {
        const children: any = {};
        const props: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                if (Array.isArray(value) && value[0] instanceof Block) {
                    value.forEach((item, index) => {
                        if (!children[key]) {
                            children[key] = [];
                        }
                        children[key][index] = item;
                    });
                } else {
                    props[key] = value;
                }
            }
        });

        return { children, props };
    }
}

export default Block;
