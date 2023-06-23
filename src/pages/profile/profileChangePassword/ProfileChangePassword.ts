import Block from '../../../shared/lib/Block';
import profileChangePasswordTemplate from './profileChangePassword.hbs';
import ProfileInput from '../../../shared/ui/ProfileInput/ProfileInput';
import Button from '../../../shared/ui/Button/Button';
import Avatar from '../../../shared/ui/Avatar/Avatar';
import { IUser } from '../../../shared/interfaces';
import { checkInput, checkSubmitForm, clearError, rules } from '../../../shared/lib/handleErrors';
import UserController from '../../../shared/controllers/UserController';
import { getAllFormData } from '../../../shared/lib/getAllFormData';
import store from '../../../app/Store';

interface IProfileChangePasswordProps {
    userAvatar?: File | string;
}

class ProfileChangePassword extends Block {
    constructor(props?: IProfileChangePasswordProps) {
        const avatar = new Avatar({
            avatarPath: '',
            hasModal: false,
        });

        const oldPasswordProfileInput = new ProfileInput({
            name: 'oldPassword',
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
                    const allOk = checkSubmitForm(event, 'passwordChange');
                    if (allOk) {
                        const data = getAllFormData(event, 'passwordChange');
                        if (Object.hasOwn(data, 'oldPassword')) {
                            UserController.changePassword(data)?.then((res) => {
                                console.log(res);
                                alert('Пароль успешно изменен!');
                            });
                            return;
                        }
                    }
                },
            },
        });

        super({
            ...props,
            avatar,
            oldPasswordProfileInput,
            passwordProfileInput,
            passwordRepeatProfileInput,
            button,
        });

        /** Установка значений в поля. */
        const setFildValues = (userData: IUser) => {
            // Записываем в поле заголовка имя пользователя
            this.setProps({ profileName: userData.first_name });

            //Заполняем поля инпутов значениями
            avatar.setProps({ avatarPath: userData.avatar });
        };

        let userData = store.getState().user;
        if (!userData) {
            const pendingIneterval = setInterval(() => {
                userData = store.getState().user;
                if (userData) {
                    clearInterval(pendingIneterval);
                    setFildValues(userData);
                }
                console.log('userData: ', userData);
            }, 150);
        } else {
            setFildValues(userData);
        }
    }

    render() {
        return this.compile(profileChangePasswordTemplate, { ...this.props });
    }
}

export default ProfileChangePassword;
