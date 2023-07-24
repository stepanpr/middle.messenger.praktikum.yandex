import Block from '../../../shared/lib/Block';
import Button from '../../../shared/ui/Button/Button';
import ProfileInput from '../../../shared/ui/ProfileInput/ProfileInput';
import Avatar from '../../../shared/ui/Avatar/Avatar';
import Router from '../../../app/Router';
import { ROUTES } from '../../../shared/constants';
import profileGeneralTemplate from './profileGeneral.hbs';
import AuthController from '../../../shared/controllers/AuthController';
import store from '../../../app/Store';

export interface IUser {
    id?: number;
    first_name?: string;
    second_name?: string;
    login?: string;
    display_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
}

class ProfileGeneral extends Block {
    constructor(props?: IUser) {
        const avatar = new Avatar({
            avatarPath: '',

            hasModal: false,
        });

        const emailProfileInput = new ProfileInput({
            name: 'email',
            label: 'Почта',
            type: 'email',
            value: null,
            disabled: true,
            events: {},
        });

        const loginProfileInput = new ProfileInput({
            name: 'login',
            label: 'Логин',
            type: 'text',
            value: null,
            disabled: true,
            events: {},
        });

        const firstNameProfileInput = new ProfileInput({
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            value: null,
            disabled: true,
            events: {},
        });

        const secondNameProfileInput = new ProfileInput({
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            value: null,
            disabled: true,
            events: {},
        });

        const displayNameProfileInput = new ProfileInput({
            name: 'display_name',
            label: 'Имя в чате',
            type: 'text',
            value: null,
            disabled: true,
            events: {},
        });

        const phoneProfileInput = new ProfileInput({
            name: 'phone',
            label: 'Телефон',
            type: 'tel',
            value: null,
            disabled: true,
            events: {},
        });

        const settingsEditButton = new Button({
            text: 'Изменить данные',
            type: 'submit',
            events: {
                click: () => Router.go('/settings-edit'),
            },
            styles: {
                button: 'profile__btn-link color-primary',
            },
        });

        const settingsEditPassButton = new Button({
            text: 'Изменить пароль',
            type: 'submit',
            events: {
                click: () => Router.go('/settings-edit-pass'),
            },
            styles: {
                button: 'profile__btn-link color-primary',
            },
        });

        const logoutButton = new Button({
            text: 'Выйти',
            type: 'submit',
            events: {
                click: () => {
                    AuthController.logout();
                    Router.go(ROUTES.SIGNIN);
                },
            },
            styles: {
                button: 'profile__btn-link color-warning',
            },
        });

        super('div', {
            emailProfileInput,
            loginProfileInput,
            firstNameProfileInput,
            secondNameProfileInput,
            displayNameProfileInput,
            phoneProfileInput,

            ...props,
            settingsEditButton,
            settingsEditPassButton,
            logoutButton,
            avatar,
        });

        /** Установка значений в поля. */
        const setFildValues = (userData: IUser) => {
            // Записываем в поле заголовка имя пользователя
            this.setProps({ profileName: userData.first_name });

            //Заполняем поля инпутов значениями
            emailProfileInput.setProps({ value: userData.email });
            loginProfileInput.setProps({ value: userData.login });
            firstNameProfileInput.setProps({ value: userData.first_name });
            secondNameProfileInput.setProps({ value: userData.second_name });
            displayNameProfileInput.setProps({ value: userData.display_name });
            phoneProfileInput.setProps({ value: userData.phone });
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
        return this.compile(profileGeneralTemplate, { ...this.props });
    }
}

export default ProfileGeneral;
