import Block from './../shared/lib/Block';
import renderDom from '../shared/lib/renderDom';

const isEqual = (lhs: string, rhs: string): boolean => {
    return lhs === rhs;
};

class Route {
    private block: Block | null = null;

    constructor(
        private pathname: string,
        private readonly BlockClass: typeof Block,
        private readonly query: string
    ) {}

    leave() {
        this.block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this.block) {
            this.block = new this.BlockClass({});

            renderDom(this.query, this.block);
        }
    }
}

export default Route;
