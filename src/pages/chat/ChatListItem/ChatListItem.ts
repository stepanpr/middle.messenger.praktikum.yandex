import chatListItemTemplate from './chatListItem.hbs';
import Block from '../../../shared/lib/Block';
import IconButton from '../../../shared/ui/IconButton/IconButton';
import ChatController from '../../../shared/controllers/ChatController';
import delete_icon from '../../../shared/ui/icons/delete_icon.png';
import './styles.less';

interface IChatListItemProps {
    title: string;
    subtitle: string;
    date: string;
    newMessages: number;
    chatId: number;
    active?: boolean;
    avatarPath?: string;
    events: { [key: string]: () => void };
}

class ChatListItem extends Block {
    constructor(props: IChatListItemProps) {
        console.log(props.events.deleteChat);
        const deleteButton = new IconButton({
            icon: delete_icon,
            type: 'button',
            events: {
                click: (event) => {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        props.events.handleDeleteChat();
                    }
                },
            },
        });

        super('li', { ...props, deleteButton });
    }

    render(): DocumentFragment {
        return this.compile(chatListItemTemplate, this.props);
    }
}

export default ChatListItem;
