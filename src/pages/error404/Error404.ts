import Block from '../../shared/lib/Block';
import error404Template from './error404.hbs';
import './error404.less';

class Error404 extends Block {
    constructor(props: Record<string, any> = {}) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(error404Template, this.props);
    }
}

export default Error404;
