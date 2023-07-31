import ChatController from '../../../shared/controllers/ChatController';
import UserController from '../../../shared/controllers/UserController';
import Block from '../../../shared/lib/Block';
import store, { StoreEvents } from '../../../app/Store';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';
import addUserModalTemplate from './addUserModal.hbs';
import { IUser } from '../../profile/ProfileGeneral/ProfileGeneral';
import './styles.less';

class AddUserModal extends Block {
    constructor(props: Record<string, any> = {}) {
        const title = 'Найти пользователя';
        const input = new Input({
            name: 'searchInput',
            label: 'Логин пользователя:',
            type: 'text',

            events: {},
        });
        const button = new Button({
            text: '',
            type: 'submit',
        });
        const closeBtn = new Button({
            text: 'X',
            type: 'button',
            styles: { button: 'closeButton' },
            events: {
                click: props.handleClose,
            },
        });

        store.on(StoreEvents.Updated, () => {
            const { modalUsersParam, usersOfChat, activeChat, user } = store.getState();

            // Инпут для ввода логина.
            const userId: HTMLInputElement = document.querySelector(
                'input[name=searchInput]'
            ) as HTMLInputElement;

            // Блок для вывода текста ошибки.
            const errorText: HTMLDivElement = document.querySelector(
                `span[name=searchInput]`
            ) as HTMLDivElement;

            if (modalUsersParam === 'remove') {
                // Удаление пользователя из чата.
                button.setProps({
                    text: 'Удалить',
                    events: {
                        click: (event: FormDataEvent) => {
                            event.preventDefault();

                            if (userId.value === user.login) {
                                if (errorText) {
                                    errorText.textContent = 'Нельзя удалить самого себя.';
                                    return;
                                }
                            }

                            UserController.getUserByLogin(userId.value).then((response: any) => {
                                if (response.status === 200) {
                                    const { id, login } =
                                        (Object.values(
                                            JSON.parse(response.response)
                                        )[0] as IUser) || {};

                                    if (id && usersOfChat.includes(login)) {
                                        ChatController.deleteUser(activeChat?.id, [id]);
                                        userId.value = '';
                                        props.handleClose();
                                    } else {
                                        if (errorText) {
                                            errorText.textContent =
                                                'Пользователь с таким логином в чате отсутствует.';
                                        }
                                    }
                                }
                            });
                        },
                    },
                });
            } else {
                // Добавление пользователя в чат.
                button.setProps({
                    text: 'Добавить',
                    events: {
                        click: (event: FormDataEvent) => {
                            event.preventDefault();

                            if (userId.value === user.login) {
                                if (errorText) {
                                    errorText.textContent = ' Нельзя добавить самого себя.';
                                    return;
                                }
                            }

                            UserController.getUserByLogin(userId.value).then((response: any) => {
                                if (response.status === 200) {
                                    const { id } =
                                        (Object.values(
                                            JSON.parse(response.response)
                                        )[0] as IUser) || {};

                                    if (id) {
                                        ChatController.addUsersToChat([id], activeChat?.id);
                                        userId.value = '';
                                        props.handleClose();
                                    } else {
                                        if (errorText) {
                                            errorText.textContent =
                                                'Пользователя с таким логином не существует.';
                                        }
                                    }
                                }
                            });
                        },
                    },
                });
            }

            // Очистка ошибки.
            if (userId) {
                userId.oninput = () => {
                    if (errorText) {
                        errorText.textContent = '';
                    }
                };
            }
        });

        super('div', {
            ...props,
            title,
            input,
            button,
            closeBtn,
        });
    }
    render(): DocumentFragment {
        return this.compile(addUserModalTemplate, this.props);
    }
}

export default AddUserModal;
