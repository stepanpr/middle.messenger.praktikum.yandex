import Block from '../shared/lib/Block';

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`Root not found "${query}"`);
    }
    root.innerHTML = '';

    root.append(block.getContent()!);

    return root;
}

class Route {
    private _block: Block | null = null;

    constructor(
        private _pathname: string,
        private readonly _blockClass: typeof Block,
        private readonly _query: string
    ) {}

    leave() {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});

            render(this._query, this._block);
            return;
        }
    }
}

class Router {
    private static __instance: Router;
    private _routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private _history = window.history;

    constructor(private readonly _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._routes = [];

        Router.__instance = this;
    }

    // регистрация блока
    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, this._rootQuery);
        this._routes.push(route);
        return this;
    }

    // запустить роутер и приложение
    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();
    }

    // go — переходит на требуемый роут
    go(pathname: string) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    // переход назад по истории браузера
    back() {
        this._history.back();
    }
    // переход вперед по истории браузера
    forward() {
        this._history.forward();
    }

    getRoute(pathname: string) {
        return this._routes.find((route) => route.match(pathname));
    }
}

export default new Router('#app');
