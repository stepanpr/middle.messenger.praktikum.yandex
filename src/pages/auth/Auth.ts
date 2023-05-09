import Block from '../../shared/lib/Block';
import authTemplate from './auth.hbs';

import './auth.less';

interface IAuthProps {
    action?: string;
    additionalAction?: string;
}

class Auth extends Block {
    constructor(props?: IAuthProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(authTemplate, this.props);
    }
}

export default Auth;
