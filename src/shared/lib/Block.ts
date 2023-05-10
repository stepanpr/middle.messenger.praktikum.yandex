import { v4 as uuidv4 } from 'uuid';
import EventBus from './EventBus';

class Block<T extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public children: Record<string, Block>;
    public props: T;
    public eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    public id = uuidv4();

    constructor(propsWithChildren: T) {
        const eventBus = new EventBus();
        const { props, children } = this._getChildren(propsWithChildren);
        this.children = children;
        this.props = this._makePropsProxy(props as T);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    get element() {
        return this._element;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _removeEventListeners() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                this._element.removeEventListener(eventName, events[eventName]);
            }
        });
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init() {}

    private _addEventListeners() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                if (this.props.selector) {
                    this._element
                        ?.querySelector(this.props.selector)
                        ?.addEventListener(eventName, events[eventName]);
                } else {
                    this._element.addEventListener(eventName, events[eventName]);
                }
            }
        });
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((childenInArray) => childenInArray.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(_oldProps: T, _newProps: T) {
        return true;
    }

    private _render() {
        const fragment = this.render();
        const element = fragment.firstElementChild as HTMLElement;

        this._removeEventListeners();

        if (this._element && element) {
            this._element.replaceWith(element);
        }

        this._element = element;
        this._addEventListeners();
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    compile(template: (props: any) => string, props: any) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            if (!Array.isArray(child)) propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const fragment = document.createElement('template');
        fragment.innerHTML = template(propsAndStubs);

        Object.values(this.children).forEach((child: any) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    getContent() {
        return this.element;
    }

    private _getChildren(propsAndChildren: T) {
        const children: Record<string, any> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]: [string, any]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    private _makePropsProxy(props: T) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target };

                target[prop as keyof T] = value;

                const newTarget = { ...oldTarget, ...target };

                const { children } = self._getChildren(newTarget);

                self.children = { ...self.children, ...children };

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}

export default Block;
