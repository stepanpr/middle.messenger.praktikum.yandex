import HTTPTransport from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';
import { API_URL } from '../../shared/constants';

const BASE_CHAT_API = `${API_URL}/chats`;
class ChatApi extends BaseAPI {
    getChat() {
        return new HTTPTransport().get(BASE_CHAT_API, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {},
        });
    }

    getChatToken(id: number) {
        return new HTTPTransport().post(`${BASE_CHAT_API}/token/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {},
        });
    }

    getChatUsers(chatId: number) {
        return new HTTPTransport().get(`${BASE_CHAT_API}/${chatId}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: { id: chatId },
        });
    }

    create(title: string) {
        return new HTTPTransport().post(BASE_CHAT_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                title,
            },
        });
    }

    addUsers(users: number[], chatId: number) {
        return new HTTPTransport().put(`${BASE_CHAT_API}/users`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: { users, chatId },
        });
    }

    delete(chatId: number) {
        return new HTTPTransport().delete(BASE_CHAT_API, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                chatId,
            },
        });
    }

    deleteUser(chatId: number, users: number[]) {
        return new HTTPTransport()
            .delete(`${BASE_CHAT_API}/users`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    users,
                    chatId,
                },
            })
            ?.then(() => this.getChatUsers(chatId));
    }
}

export default new ChatApi();
