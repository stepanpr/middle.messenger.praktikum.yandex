import ChatController from '../../../shared/controllers/ChatController';
import Block from '../../../shared/lib/Block';
import store, { StoreEvents } from '../../../app/Store';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';
import addUserModalTemplate from './addUserModal.hbs';
import './styles.less';

class AddUserModal extends Block {
    constructor(props: Record<string, any> = {}) {
        const title = 'Найти пользователя';
        const input = new Input({
            name: 'searchInput',
            label: 'Id пользователя',
            type: 'text',
            events: {},
        });
        const button = new Button({
            text: 'Добавить',
            type: 'submit',
            events: {
                click: (event: FormDataEvent) => {
                    event.preventDefault();
                    const { activeChat } = store.getState();
                    const userId: HTMLInputElement = document.querySelector(
                        'input[name=searchInput]'
                    ) as HTMLInputElement;
                    ChatController.addUsersToChat([+userId.value], activeChat?.id)
                        ?.then(() => alert('В чат добавлен пользователь'))
                        .catch(() => alert('Не удалось добавить пользователя'));
                    userId.value = '';
                    document.querySelector('#modal')?.classList.remove('activeModal');
                },
            },
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
            const { modal } = store.getState();
            if (modal === 'remove') {
                button.setProps({
                    text: 'Удалить',
                    events: {
                        click: (event: FormDataEvent) => {
                            event.preventDefault();
                            const { activeChat } = store.getState();
                            const userId: HTMLInputElement = document.querySelector(
                                'input[name=searchInput]'
                            ) as HTMLInputElement;
                            ChatController.deleteUser(activeChat?.id, [+userId.value])
                                ?.then(() => alert('Пользователь удалён из чата'))
                                .catch(() => alert('Не удалось удалить пользователя'));
                            userId.value = '';
                            props.handleClose();
                        },
                    },
                });
            } else {
                button.setProps({
                    text: 'Добавить',
                    type: 'submit',
                    events: {
                        click: (event: FormDataEvent) => {
                            event.preventDefault();
                            const { activeChat } = store.getState();
                            const userId: HTMLInputElement = document.querySelector(
                                'input[name=searchInput]'
                            ) as HTMLInputElement;
                            ChatController.addUsersToChat([+userId.value], activeChat?.id)
                                ?.then(() => alert('В чат добавлен пользователь'))
                                .catch(() => alert('Не удалось добавить пользователя'));
                            userId.value = '';
                            props.handleClose();
                        },
                    },
                });
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
