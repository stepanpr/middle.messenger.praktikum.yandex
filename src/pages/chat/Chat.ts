import Block from '../../shared/lib/Block';

// templates
import chatTemplate from './chat.hbs';
import chatListItemTemplate from './templates/chatsListItem.hbs';
import messageTemplate from './templates/chatMessage.hbs';

// icons
import defaultAavatar_icon from '../../shared/ui/icons/avatar_icon.png';
import arrowRight_icon from '../../shared/ui/icons/arrow_right_icon.png';
import attachment_icon from '../../shared/ui/icons/attachment_icon.png';
import delivered_icon from '../../shared/ui/icons/delivered_icon.png';

//usersImages
import img_1 from '../../shared/ui/icons/img1.png';
import img_2 from '../../shared/ui/icons/img2.jpg';

import './chat.less';
import './templates/chatsListItem.less';
import './templates/chatMessage.less';

/** TChatItem
 * @field userAvatar
 * @field userName
 * @field lastMessage
 * @field time
 * @field count
 */
type TChatItem = {
    userAvatar: any;
    userName: string;
    lastMessage: string;
    time: string;
    count: number | string;
};

const chatList: TChatItem[] = [
    {
        userAvatar: defaultAavatar_icon,
        userName: 'user1',
        lastMessage: 'last-message',
        time: '23:30',
        count: 2,
    },
    {
        userAvatar: defaultAavatar_icon,
        userName: 'user2',
        lastMessage: 'last-message',
        time: '10:59',
        count: 1,
    },
    {
        userAvatar: defaultAavatar_icon,
        userName: 'user3',
        lastMessage: 'last-message',
        time: '21:01',
        count: 5,
    },
    {
        userAvatar: defaultAavatar_icon,
        userName: 'user4',
        lastMessage: 'last-message',
        time: '16:59',
        count: 4,
    },
];

/** TMessageItem
 * @field isMyMessage
 * @field text
 * @field image
 * @field time
 * @field delivered_icon
 */
type TMessageItem = {
    isMyMessage?: boolean;
    text: string;
    image?: any;
    time: string;
    delivered_icon?: any;
};

const messageList: TMessageItem[] = [
    {
        isMyMessage: true,
        text: 'Привет',
        time: '10:20',
        delivered_icon,
    },
    {
        text: 'Пирвет!! Как дела?',
        time: '10:22',
        delivered_icon,
    },
    {
        isMyMessage: true,
        text: 'Все отлично! Ты как?',
        time: '10:37',
        delivered_icon,
    },
    {
        isMyMessage: true,
        text: 'Смотри, фото из поездки...',
        time: '10:52',
        image: img_1,
        delivered_icon,
    },
    {
        text: 'Супер! А у меня сейчас такой вид...',
        time: '11:17',
        image: img_2,
        delivered_icon,
    },
    {
        isMyMessage: true,
        text: 'Отлично! Ладно, скоро увидимся!',
        time: '11:22',
        delivered_icon,
    },
    {
        text: 'Да, конечно! Пока!',
        time: '11:25',
        delivered_icon,
    },
    {
        isMyMessage: true,
        text: 'Пока!!',
        time: '11:30',
        delivered_icon,
    },
];

/** Генерация списка сущностей на основе входящих данных. */
const createListTemplate = <T>(items: T[], template: (params: any) => string) => {
    let listTemplate = ``;

    items.forEach((_, i) => {
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
    constructor(props?: IChatProps & IChatTemlpateContext) {
        super({
            mainAvatar: defaultAavatar_icon,
            mainName: props?.mainName,
        });
    }

    render() {
        return this.compile(chatTemplate, {
            ...this.props,
            arrowRight_icon,
            attachment_icon,
            messagesList: createListTemplate(messageList, messageTemplate),
            chatList: createListTemplate(chatList, chatListItemTemplate),
        });
    }
}

export default Chat;
