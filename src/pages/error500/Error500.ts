import Block from '../../shared/lib/Block';
import error500Template from './error500.hbs';
import './error500.less';

class Error500 extends Block {
    constructor(props: Record<string, any> = {}) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(error500Template, this.props);
    }
}

export default Error500;
