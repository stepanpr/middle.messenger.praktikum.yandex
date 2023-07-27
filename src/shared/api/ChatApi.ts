import HTTPTransport, { API_URL } from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';

const BASE_CHAT_API = `${API_URL}/chats`;
class ChatApi extends BaseAPI {
    getChat() {
        return new HTTPTransport().get(BASE_CHAT_API, {
            headers: { 'content-type': 'application/json' },
        });
    }

    getChatToken(id: number) {
        return new HTTPTransport().post(`${BASE_CHAT_API}/token/${id}`, {
            headers: { 'content-type': 'application/json' },
        });
    }

    getChatUsers(chatId: number) {
        return new HTTPTransport().get(`${BASE_CHAT_API}/${chatId}/users`, {
            data: { id: chatId },
            headers: { 'content-type': 'application/json' },
        });
    }

    create(title: string) {
        return new HTTPTransport().post(BASE_CHAT_API, {
            data: { title },
            headers: { 'content-type': 'application/json' },
        });
    }

    addUsers(users: number[], chatId: number) {
        return new HTTPTransport().put(`${BASE_CHAT_API}/users`, {
            data: { users, chatId },
            headers: { 'content-type': 'application/json' },
        });
    }

    delete(chatId: number) {
        return new HTTPTransport().delete(BASE_CHAT_API, {
            data: { chatId },
            headers: { 'content-type': 'application/json' },
        });
    }

    deleteUser(chatId: number, users: number[]) {
        return new HTTPTransport()
            .delete(`${BASE_CHAT_API}/users`, {
                data: { chatId, users },
                headers: { 'content-type': 'application/json' },
            })
            ?.then(() => this.getChatUsers(chatId));
    }
}

export default new ChatApi();
