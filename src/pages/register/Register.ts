import Block from '../../shared/lib/Block';
import registerTemplate from './register.hbs';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import { checkInput, checkSubmitForm, clearError, rules } from '../../shared/lib/handleErrors';
import './register.less';

interface RegisterProps {
    action: string;
    additionalAction: string;
}
class Register extends Block {
    constructor(props: RegisterProps) {
        const emailInput = new Input({
            name: 'email',
            label: 'Почта',
            type: 'email',
            events: {
                change: (e) => checkInput(e, rules.email),
                input: (e) => clearError(e),
            },
        });

        const loginInput = new Input({
            name: 'login',
            label: 'Логин',
            type: 'text',
            events: {
                change: (e) => checkInput(e, rules.login),
                input: (e) => clearError(e),
            },
        });

        const firstNameInput = new Input({
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            events: {
                change: (e) => checkInput(e, rules.first_name),
                input: (e) => clearError(e),
            },
        });

        const lastNameInput = new Input({
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            events: {
                change: (e) => checkInput(e, rules.second_name),
                input: (e) => clearError(e),
            },
        });

        const phoneInput = new Input({
            name: 'phone',
            label: 'Телефон',
            type: 'tel',
            events: {
                change: (e) => checkInput(e, rules.phone),
                input: (e) => clearError(e),
            },
        });

        const passwordInput = new Input({
            name: 'password',
            label: 'Пароль',
            type: 'password',
            events: {
                change: (e) => checkInput(e, rules.password),
                input: (e) => clearError(e),
            },
        });

        const passwordConfirmInput = new Input({
            name: 'password_confirm',
            label: 'Пароль (ещё раз)',
            type: 'password',
            events: {
                change: (e) => checkInput(e, rules.password),
                input: (e) => clearError(e),
            },
        });

        const registerButton = new Button({
            text: props.action,
            type: 'submit',
            events: {
                click: (event: Event) => {
                    checkSubmitForm(event);
                },
            },
        });

        super({
            ...props,
            emailInput,
            loginInput,
            firstNameInput,
            lastNameInput,
            phoneInput,
            passwordInput,
            passwordConfirmInput,
            registerButton,
			
        });
    }

    render() {
        return this.compile(registerTemplate, this.props);
    }
}

export default Register;
