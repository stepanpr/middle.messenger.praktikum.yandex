
import chatApi from '../api/ChatApi';
import store from '../../app/Store';
import { parseJson } from '../lib/parseJson';

export interface ChatUserInterface {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    login: string;
    phone: string;
    second_name: string;
}

export interface LastMessageInterface {
    content: string;
    id: number;
    time: string;
    user: ChatUserInterface;
}

export interface ChatInerface {
    avatar: string;
    created_by: number;
    id: number;
    last_message?: LastMessageInterface;
    title: string;
    unread_count: number;
}

class ChatController {
    getChats = () => {
        return chatApi.getChat()?.then((response: { response: string }) => {
            store.set('chats', parseJson(response.response));
        });
    };

    getChatToketById = (chat: ChatInerface) => {
        return chatApi
            .getChatToken(chat.id)
            ?.then((resp: { response: string }) => {
                store.set('chatToken', parseJson(resp.response));
                return parseJson(resp.response);
            })
            .then((data: any) => {
                store.set('activeChat', chat);
                return data;
            });
    };

    getChatUsers = (chatId: number) => {
        return chatApi.getChatUsers(chatId);
    };

    createNewChat = (title: string) => {
        return chatApi
            .create(title)
            ?.then(() => this.getChats())
            .catch((err: any) => alert(err.message));
    };

    addUsersToChat = (users: number[], chatId: number) => {
        return chatApi.addUsers(users, chatId);
    };

    deleteChat = (chatId: number) => {
        return chatApi
            .delete(chatId)
            ?.then(() => this.getChats())
            .catch((err: any) => alert(err.message));
    };

    deleteUser = (chatId: number, users: number[]) => {
        return chatApi.deleteUser(chatId, users);
    };
}

export default new ChatController();
