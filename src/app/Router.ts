import Route from './Route';

class Router {
    static __instance: Router;

    routes: Route[] = [];

    currentRoute: Route | null = null;

    history: History;

    constructor(private readonly rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        if (typeof window !== 'undefined') {
            this.history = window.history;
        }
        Router.__instance = this;
    }

    public use(pathname: string, block: any) {
        const route = new Route(pathname, block, this.rootQuery);
        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }

    public go(pathname: string) {
        if (this.history) this.history.pushState({}, '', pathname);

        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    getCurrentRouter() {
        return this.currentRoute;
    }
}

export default new Router('#root');
