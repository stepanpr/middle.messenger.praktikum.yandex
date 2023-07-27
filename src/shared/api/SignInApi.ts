import HTTPTransport, { API_URL } from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';

/** Интерфейс авторизации. */
export interface LoginFormDataInterface {
    login: string;
    password: string;
}

export class SugninApi extends BaseAPI {
    create(data: LoginFormDataInterface): Promise<unknown> | undefined {
        if (!data) return;
        return new HTTPTransport().post(`${API_URL}/auth/signin`, {
            data,
            headers: { 'content-type': 'application/json' },
        });
    }
}
