import HTTPTransport, { API_URL } from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';

export class UserApi extends BaseAPI {
    static getUser = (): Promise<unknown> | undefined => {
        return new HTTPTransport().get(`${API_URL}/auth/user`, {
            headers: { 'content-type': 'application/json' },
        });
    };

    static logout = () => {
        new HTTPTransport().post(`${API_URL}/auth/logout`, {
            headers: { 'content-type': 'application/json' },
        });
    };

    static changeProfile = (data: any) => {
        return new HTTPTransport().put(`${API_URL}/user/profile`, {
            data,
            headers: { 'content-type': 'application/json' },
        });
    };

    static changePassword = (data: any) => {
        return new HTTPTransport().put(`${API_URL}/user/password`, {
            data,
            headers: { 'content-type': 'application/json' },
        });
    };

    static changeAvatar = (data: FormData) => {
        return new HTTPTransport().put(`${API_URL}/user/profile/avatar`, {
            data,
        });
    };

    static getUserByLogin = (login: string): any => {
        return new HTTPTransport().post(`${API_URL}/user/search`, {
            data: { login },
            headers: { 'content-type': 'application/json' },
        });
    };
}
