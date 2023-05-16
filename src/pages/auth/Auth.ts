import Block from '../../shared/lib/Block';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import authTemplate from './auth.hbs';
import './auth.less';
import { checkInput, checkSubmitForm, clearError, rules } from '../../shared/lib/handleErrors';

interface IAuthProps {
    action: string;
    additionalAction: string;
}

class Auth extends Block {
    constructor(props: IAuthProps) {
        const inputLogin = new Input({
            label: 'Логин',
            type: 'text',
            name: 'login',
            events: {
                change: (e) => checkInput(e, rules.login),
                input: (e) => clearError(e),
            },
        });

        const inputPassword = new Input({
            label: 'Пароль',
            type: 'password',
            name: 'password',
            events: {
                change: (e) => checkInput(e, rules.password),
                input: (e) => clearError(e),
            },
        });
        const authButton = new Button({
            text: props.action,
            type: 'submit',
            events: {
                click: (e) => checkSubmitForm(e),
            },
        });

        super({
            ...props,
            inputLogin,
            inputPassword,
            authButton,
        });
    }

    render() {
        return this.compile(authTemplate, this.props);
    }
}

export default Auth;
