import Block from '../../shared/lib/Block';
import registerTemplate from './register.hbs';
import './register.less';

interface RegisterProps {
    action?: string;
    additionalAction?: string;
}

class Register extends Block {
    constructor(props?: RegisterProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(registerTemplate, this.props);
    }
}

export default Register;
