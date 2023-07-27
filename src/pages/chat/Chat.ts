import Block from '../../shared/lib/Block';
import Router from '../../app/Router';
import { RESOURCES_URL } from '../../shared/constants';

import IconButton from '../../shared/ui/IconButton/IconButton';
import Button from '../../shared/ui/Button/Button';
import Input from '../../shared//ui/Input/Input';
import AddUserModal from './AddUserModal/AddUserModal';
import ChatListItem from './ChatListItem/ChatListItem';

// templates
import chatTemplate from './chat.hbs';
import messageTemplate from './templates/chatMessage.hbs';

// icons
import defaultAavatar_icon from '../../shared/ui/icons/avatar_icon.png';
import arrowRight_icon from '../../shared/ui/icons/arrow_right_icon.png';
import attachment_icon from '../../shared/ui/icons/attachment_icon.png';
import delivered_icon from '../../shared/ui/icons/delivered_icon.png';

//usersImages
import avatarStubIcon from '../../shared/ui/icons/no_avatar_icon.png';

//Controllers and Store
import ChatController, { ChatInerface } from '../../shared/controllers/ChatController';
import UserController from '../../shared/controllers/UserController';
import store, { StoreEvents } from '../../app/Store';
import Socket from '../../shared/lib/Socket';

import './chat.less';
import './templates/chatMessage.less';

/** TMessageItem
 * @field isMyMessage
 * @field text
 * @field image
 * @field imgAlt
 * @field time
 * @field delivered_icon
 * @field id
 */
type TMessageItem = {
    isMyMessage?: boolean;
    text: string;
    image?: any;
    imgAlt: string;
    time: string;
    delivered_icon?: any;
    id: string;
};

/** Генерация списка сущностей (сообщений) на основе входящих данных. */
const createListTemplate = <T>(items: T[] | TMessageItem[], template: (params: any) => string) => {
    let listTemplate = ``;

    items?.forEach((_, i) => {
        listTemplate += template(items[i]);
    });

    return listTemplate;
};

/** Контекст шаблона чата.
 * @param arrowRight_icon Значок для кнопки "Отправить".
 * @param attachment_icon Иконка кнопки вложения.
 * @param messagesList Список сообщений.
 * @param chatList Список чатов.
 */
interface IChatTemlpateContext {
    arrowRight_icon?: File | string;
    attachment_icon?: File | string;
    messagesList?: string;
    chatList?: string;
}

/** Пропсы чата.
 * @prop mainName Имя пользователя.
 * @prop mainAvatar Аватар пользователя.
 */
interface IChatProps {
    mainName?: string;
    mainAvatar?: File | string;
}

class Chat extends Block {
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

    // Сообщения чата.
    private chatMessages: TMessageItem[];

    // Признак активного чата для добаления кнопок добавления пользователей.
    private isActiveChat: boolean;

    // Логины пользователй чата.
    private usersOfChat: string;

    // Нужно для обновления страницы после удаления последнего чата из массива.
    private isReloaded: boolean = true;

    // Заглушка если чат не выбран.
    private isChatNotSelected: boolean = true;

    constructor(props?: IChatProps & IChatTemlpateContext) {
        const { chats, user } = store.getState();
        if (!user) {
            UserController.getUserAndSave();
        }
        if (!chats) {
            ChatController.getChats();
        }

        store.on(StoreEvents.Updated, () => {
            const { chats, activeChat, chatToken, messages, user, socket } = store.getState();

            // Если есть активный чат, то показываем конпки добавления пользователей
            if (activeChat) {
                this.isActiveChat = true;
            }

            // Заглушка если чат не выбран.
            this.isChatNotSelected = activeChat === undefined ? true : false;
            this.setProps({ isChatNotSelected: this.isChatNotSelected });

            // Обноление компонента если чаты отстутствуют (после удаления единственного чата в массиве chats).
            if (chats?.length === 0 && !this.isReloaded) {
                location.reload();
                this.isReloaded = true;
            } else if (chats?.length > 0) {
                this.isReloaded = false;
            }

            // Список пользователей текущего чата.
            if (activeChat) {
                ChatController.getChatUsers(activeChat?.id)?.then((response: any) => {
                    let arr: any = [];

                    JSON.parse(response.response).forEach((user: any) => {
                        console.log('user', user);
                        arr.push(user.login);
                    });

                    this.usersOfChat = arr.join();
                });
            }

            // Установка названия, списка пользователей и аватара чата.
            this.setProps({
                chatAvatar: activeChat?.avatar ? activeChat?.avatar : defaultAavatar_icon,
                chatName: activeChat?.title,
                usersOfChat: this.usersOfChat,
            });

            const chatList: any[] = [];
            chats?.forEach((chat: ChatInerface) => {
                chatList.push(
                    new ChatListItem({
                        title: chat.title,
                        subtitle: chat?.last_message?.content || '',
                        date: chat?.last_message?.time
                            ? new Date(chat.last_message.time).toLocaleString()
                            : '',
                        newMessage: chat.unread_count,
                        active: activeChat?.id === chat.id,
                        chatId: chat.id,
                        avatarPath: chat.avatar ? `${RESOURCES_URL}${chat.avatar}` : avatarStubIcon,
                        events: {
                            click: () => {
                                ChatController.getChats();

                                chatList.forEach((chatItem: any) => {
                                    //сравниваем ID
                                    if (chat.id === chatItem.props.chatId) {
                                        ChatController.getChatToketById(chat)?.then((resp: any) => {
                                            if (!socket?.chat_id) {
                                                const socket = new Socket({
                                                    chatId: `${chat?.id}`,
                                                    token: resp.token,
                                                    userId: user?.id,
                                                });
                                                socket.open();
                                                store.set('socket', socket);
                                            }
                                        });
                                    } else {
                                        socket?.close();
                                    }
                                });
                            },
                        },
                    })
                );
            });

            this.setProps({ chatList: chatList ? chatList : null });

            if (activeChat) {
                if (!activeChat.last_message) {
                    this.setProps({ chatMessages: null });
                }
                socket?.message();

                // Вывод сообщений или заглушки если чат пустой.
                if (messages && activeChat.id && messages[activeChat.id]?.length > 0) {
                    this.chatMessages = messages[activeChat.id]?.map((message: any) => {
                        return {
                            isMyMessage: user.id === message.user_id,
                            text: message.content,
                            image: message.file ? message.file : null,
                            imgAlt: message.imgAlt,
                            time: message?.time ? new Date(message?.time).toLocaleString() : '', //?
                            delivered_icon,
                            id: message.id,
                        };
                    });

                    this.setProps({
                        chatMessages: createListTemplate(this.chatMessages, messageTemplate),
                        isChatEmpty: false,
                    });
                } else {
                    this.setProps({
                        isChatEmpty: true,
                    });
                }
            }
        });

        const sendButton = new IconButton({
            type: 'submit',
            icon: arrowRight_icon,
            styles: { button: 'icon-button' },
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    const { socket } = store.getState();
                    const form: HTMLFormElement = document.forms.namedItem(
                        '.chat-new-message'
                    ) as HTMLFormElement;
                    const messageInput: HTMLInputElement = document.querySelector(
                        'input[name=message]'
                    ) as HTMLInputElement;
                    ChatController.getChats();
                    socket.send({ content: messageInput.value, type: 'message' });
                    form?.reset();
                },
            },
        });

        const settingsButton = new Button({
            text: 'Профиль >',
            type: 'submit',
            events: {
                click: () => Router.go('/settings'),
            },
            styles: {
                button: 'chats-column__profile-button profile__btn-link',
            },
        });

        const settingsEditButton = new Button({
            text: 'Настройки',
            type: 'submit',
            events: {
                click: () => Router.go('/settings-edit'),
            },
            styles: {
                button: 'chat-view__menu-button profile__btn-link',
            },
        });

        const buttonAdd = new Button({
            text: '+',
            type: 'button',
            styles: { button: 'chatActionButtons' },
            events: {
                click: () => {
                    store.set('modal', 'add');
                    this._showModal();
                },
            },
        });

        const buttonDelete = new Button({
            text: '-',
            type: 'button',
            styles: { button: 'chatActionButtons' },
            events: {
                click: () => {
                    store.set('modal', 'remove');
                    this._showModal();
                },
            },
        });

        const newChatInput = new Input({
            name: 'newСhat',
            label: 'Создать чат (введите название):',
            type: 'text',
            styles: { input: 'input-new-chat' },
            events: {},
        });

        const createNewChat = new Button({
            text: 'Создать',
            type: 'submit',
            styles: { button: 'button-new-chat' },
            events: {
                click: (event: any) => {
                    event.preventDefault();
                    if (event.target && event.target.form[0]?.value) {
                        ChatController.createNewChat(event.target.form[0].value)?.then(() => {
                            event.target.form[0].value = null;
                        });
                    }
                },
            },
        });

        const modal = new AddUserModal({
            handleClose: () => {
                this._hideModal();
            },
        });

        super('div', {
            props,
            mainName: props?.mainName,
            sendButton,
            settingsButton,
            settingsEditButton,
            newChatInput,
            createNewChat,
            modal,
            buttonAdd,
            buttonDelete,
        });
    }

    render() {
        return this.compile(chatTemplate, {
            ...this.props,
            isActiveChat: this.isActiveChat,
            attachment_icon,
        });
    }
}

export default Chat;
