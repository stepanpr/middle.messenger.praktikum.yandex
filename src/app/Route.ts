import Block from './../shared/lib/Block';
import renderDom from '../shared/lib/renderDom';

const isEqual = (lhs: string, rhs: string): boolean => {
    return lhs === rhs;
};

class Route {
    _pathname: string;
    _blockClass: any;
    _block: Block | null;
    _props: any;
    constructor(pathname: string, view: Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    leave() {
        this._block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass('div', {});

            if (this._block) {
                renderDom(this._props, this._block);
                return;
            }
        }
    }
}

export default Route;
