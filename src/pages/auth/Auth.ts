import Block from '../../shared/lib/Block';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import authTemplate from './auth.hbs';

import { checkInput, checkSubmitForm, clearError, rules } from '../../shared/lib/handleErrors';

import Router from '../../app/Router';
// import { onSubmitForm } from '../../shared/lib/onSubmit';
import AuthController from '../../shared/controllers/AuthController';

import { BASE_URL, SIGNUP_PATH } from '../../shared/constants';
import { LoginFormDataInterface } from '../../shared/interfaces';
// import Link from '../../../components/link';

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
				  const registerFormData: LoginFormDataInterface | undefined = checkSubmitForm(event, 'login');
				  if (registerFormData) {
					  AuthController.authUser(registerFormData);
				  }
				} 
			  }
        });
        const registerButton = new Button({
            text: 'Нет аккаунта?',
            type: 'submit',
            events: {
				click: (event) => {
					if (event) {
						event.preventDefault();
						Router.go(SIGNUP_PATH);
					}
				  },
            },
            styles: {
                button: 'auth-form__signup profile__btn-link',
            },
        });

        super({
			
            ...props,
            inputLogin,
            inputPassword,
            authButton,
            registerButton,
			url: `${BASE_URL}${SIGNUP_PATH}`,
        });
    }

    render() {
        return this.compile(authTemplate, { ...this.props });
    }
}

export default Auth;
