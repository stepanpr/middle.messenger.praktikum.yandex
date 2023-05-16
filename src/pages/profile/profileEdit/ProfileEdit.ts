import Block from '../../../shared/lib/Block';
import ProfileInput from '../../../shared/ui/ProfileInput/ProfileInput';
import Button from '../../../shared/ui/Button/Button';
import { checkInput, checkSubmitForm, clearError, rules } from '../../../shared/lib/handleErrors';
import profileEditTemplate from './profileEdit.hbs';

interface IProfileEditProps {
    userAvatar?: File | string;
}

class ProfileEdit extends Block {
    constructor(props?: IProfileEditProps) {
        const emailProfileInput = new ProfileInput({
            name: 'email',
            label: 'Почта',
            type: 'email',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.email),
                input: (e) => clearError(e),
            },
        });

        const loginProfileInput = new ProfileInput({
            name: 'login',
            label: 'Логин',
            type: 'text',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.login),
                input: (e) => clearError(e),
            },
        });

        const firstNameProfileInput = new ProfileInput({
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.first_name),
                input: (e) => clearError(e),
            },
        });

        const lastNameProfileInput = new ProfileInput({
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.second_name),
                input: (e) => clearError(e),
            },
        });

        const displayNameProfileInput = new ProfileInput({
            name: 'display_name',
            label: 'Имя в чате',
            type: 'text',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.display_name),
                input: (e) => clearError(e),
            },
        });

        const phoneProfileInput = new ProfileInput({
            name: 'phone',
            label: 'Телефон',
            type: 'tel',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.phone),
                input: (e) => clearError(e),
            },
        });

        const button = new Button({
            text: 'Сохранить',
            type: 'submit',
            events: {
                click: (event: Event) => {
                    checkSubmitForm(event);
                },
            },
        });

        super({
            ...props,
            emailProfileInput,
            loginProfileInput,
            firstNameProfileInput,
            lastNameProfileInput,
            displayNameProfileInput,
            phoneProfileInput,
            button,
        });
    }

    render() {
        return this.compile(profileEditTemplate, { ...this.props });
    }
}

export default ProfileEdit;
