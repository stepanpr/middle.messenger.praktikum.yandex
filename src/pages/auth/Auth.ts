import Block from '../../shared/lib/Block';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import authTemplate from './auth.hbs';
import { checkInput, checkSubmitForm, clearError, rules } from '../../shared/lib/handleErrors';
import Router from '../../app/Router';
import AuthController, { LoginFormDataInterface } from '../../shared/controllers/AuthController';
import { BASE_URL, ROUTES } from '../../shared/constants';

import './auth.less';

interface IAuthProps {
    action?: string;
    additionalAction?: string;
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
            text: props.action || 'Войти',
            type: 'submit',

            events: {
                click: (event: Event) => {
                    const registerFormData: LoginFormDataInterface | undefined = checkSubmitForm(
                        event,
                        'login'
                    );
                    if (registerFormData) {
                        AuthController.authUser(registerFormData);
                    }
                },
            },
        });
        const registerButton = new Button({
            text: 'Нет аккаунта?',
            type: 'submit',
            events: {
                click: (event) => {
                    if (event) {
                        event.preventDefault();
                        Router.go(ROUTES.SIGNUP);
                    }
                },
            },
            styles: {
                button: 'auth-form__signup profile__btn-link',
            },
        });

        super('div', {
            ...props,
            inputLogin,
            inputPassword,
            authButton,
            registerButton,
            url: `${BASE_URL}${ROUTES.SIGNUP}`,
        });
    }

    render() {
        return this.compile(authTemplate, { ...this.props });
    }
}

export default Auth;
