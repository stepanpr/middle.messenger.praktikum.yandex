import Block from '../../../shared/lib/Block';
import profileChangePasswordTemplate from './profileChangePassword.hbs';
import ProfileInput from '../../../shared/ui/ProfileInput/ProfileInput';
import Button from '../../../shared/ui/Button/Button';
import { checkInput, checkSubmitForm, clearError, rules } from '../../../shared/lib/handleErrors';

interface IProfileChangePasswordProps {
    userAvatar?: File | string;
}

class ProfileChangePassword extends Block {
    constructor(props?: IProfileChangePasswordProps) {
        const oldPasswordProfileInput = new ProfileInput({
            name: 'old_password',
            label: 'Старый пароль',
            type: 'password',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.old_password),
                input: (e) => clearError(e),
            },
        });

        const passwordProfileInput = new ProfileInput({
            name: 'password',
            label: 'Новый пароль',
            type: 'password',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.password),
                input: (e) => clearError(e),
            },
        });

        const passwordRepeatProfileInput = new ProfileInput({
            name: 'password_repeat ',
            label: 'Повторите новый пароль',
            type: 'password',
            value: null,
            disabled: false,
            events: {
                change: (e) => checkInput(e, rules.password_repeat),
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
            oldPasswordProfileInput,
            passwordProfileInput,
            passwordRepeatProfileInput,
            button,
        });
    }

    render() {
        return this.compile(profileChangePasswordTemplate, { ...this.props });
    }
}

export default ProfileChangePassword;
