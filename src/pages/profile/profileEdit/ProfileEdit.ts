import Block from '../../../shared/lib/Block';
import ProfileInput from '../../../shared/ui/ProfileInput/ProfileInput';
import Button from '../../../shared/ui/Button/Button';
import Avatar from '../../../shared/ui/Avatar/Avatar';
import Modal from '../../../shared/ui/Modal/Modal';
import { IUser } from '../ProfileGeneral/ProfileGeneral';
import { checkInput, checkSubmitForm, clearError, rules } from '../../../shared/lib/handleErrors';
import profileEditTemplate from './profileEdit.hbs';
import UserController from '../../../shared/controllers/UserController';
import AuthController from '../../../shared/controllers/AuthController';
import { getAllFormData } from '../../../shared/lib/getAllFormData';
import { parseJson } from '../../../shared/lib/parseJson';
import store from '../../../app/Store';

class ProfileEdit extends Block {
    private _showModal() {
        const modalElement = (this.children.modal as Block).getContent();
        if (modalElement) {
            modalElement.style.display = 'block';
        }
    }

    private _hideModal() {
        const modalElement = (this.children.modal as Block).getContent();
        if (modalElement) {
            modalElement.style.display = 'none';
        }
    }

    constructor(props?: IUser) {
        const avatar = new Avatar({
            avatarPath: '',

            hasModal: true,

            events: {
                click: () => {
                    this._showModal();
                },
            },
        });

        const modal = new Modal({
            isFile: true,
            title: 'Загрузите файл',
            buttonTitle: 'Поменять',
            submitCallback: UserController.changeAvatar.bind(UserController),

            reloadAvatar: () => {
                setTimeout(() => {
                    AuthController.getUser()?.then((data: any) => {
                        console.log('dataInLayout: ', data);
                        store.set('user', data);
                        avatar.setProps({ avatarPath: data.avatar });
                    });
                }, 1000);
            },
        });

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

        const secondNameProfileInput = new ProfileInput({
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
                    const allOk = checkSubmitForm(event, 'profileChange');
                    if (allOk) {
                        const data = getAllFormData(event, 'profileChange');

                        UserController.changeProfile(data)
                            ?.then((resp) => {
                                if (resp.status === 200) {
                                    const data = parseJson(resp.response);
                                    this.setProps({ profileName: data.first_name });
                                    alert('Данные успешно изменены!');
                                }
                            })
                            .catch((e) => alert(e));
                    }
                },
            },
        });

        super('div', {
            ...props,
            avatar,
            emailProfileInput,
            loginProfileInput,
            firstNameProfileInput,
            secondNameProfileInput,
            displayNameProfileInput,
            phoneProfileInput,
            button,
            modal,
            events: {
                submit: () => {
                    UserController.changeProfile.bind(UserController), this._hideModal();
                },
            },
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
        return this.compile(profileEditTemplate, {
            ...this.props,
        });
    }
}

export default ProfileEdit;
