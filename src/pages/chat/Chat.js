// templates
import chatTemplate from './chat.hbs';
import chatListItemTemplate from './templates/chatsListItem.hbs';
import messageTemplate from './templates/chatMessage.hbs';

// icons
import avatar_icon from '../../../static/images/avatar_icon.png';
import arrow_ight_icon from '../../../static/images/arrow_right_icon.png';
import attachment_icon from '../../../static/images/attachment_icon.png';
import delivered_icon from '../../../static/images/delivered_icon.png';

//usersImages
import img_1 from '../../../static/images/img1.png';
import img_2 from '../../../static/images/img2.jpg';

import './chat.less';
import './templates/chatsListItem.less';
import './templates/chatMessage.less';

/** chatList
 * @field avatar_icon
 * @field userName
 * @field lastMessage
 * @field time
 * @field count
 */
const chatList = [
    {
        avatar_icon,
        userName: 'user1',
        lastMessage: 'last-message',
        time: '23:30',
        count: 2,
    },
    {
        avatar_icon,
        userName: 'user2',
        lastMessage: 'last-message',
        time: '10:59',
        count: 1,
    },
    {
        avatar_icon,
        userName: 'user3',
        lastMessage: 'last-message',
        time: '21:01',
        count: 5,
    },
    {
        avatar_icon,
        userName: 'user4',
        lastMessage: 'last-message',
        time: '16:59',
        count: 4,
    },
];

/** messageList
 * @field isMyMessage
 * @field text
 * @field image
 * @field time
 * @field delivered_icon
 */
const messageList = [
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
const createListTemplate = (items, template) => {
    let listTemplate = ``;

    items.forEach((_, i) => {
        listTemplate += template(items[i]);
    });

    return listTemplate;
};

const Chat = () => {
    const context = {
        avatar_icon,
        arrow_ight_icon,
        attachment_icon,
        messagesList: createListTemplate(messageList, messageTemplate),
        chatList: createListTemplate(chatList, chatListItemTemplate),
    };

    return chatTemplate(context);
};

export default Chat;
