import EventBus from './EventBus';
import { v4 as uuidv4 } from 'uuid';

class Block<T extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public id = uuidv4();
    protected props: T;
    private eventBus: () => EventBus;
    private children: Record<string, Block>;
    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: T };

    constructor(tagName: string, props: T) {
        const eventBus = new EventBus();

        this._meta = { tagName, props };
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {}

    componentDidMount(oldProps: T) {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) return;
        // this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this._render();
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    setProps = (nextProps: T) => {
        if (!nextProps) return;
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();

        if (this._element) {
            this._element.innerHTML = '';
            this._element.append(block);
        }
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    compile(template: (props: any) => string, props: any) {
        const propsAndStubs = { ...props };
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        // Временный контейнер.
        const tempСonteiner = this._createDocumentElement('template') as HTMLTemplateElement;

        tempСonteiner.innerHTML = template(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            const stub = tempСonteiner.content.querySelector(`[data-id="${child.id}"]`);
            if (stub) stub.replaceWith(child.getContent());
        });

        return tempСonteiner.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: T) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                target[prop as keyof T] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }
}

export default Block;
