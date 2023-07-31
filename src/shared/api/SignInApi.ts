import HTTPTransport from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';
import { API_URL } from '../../shared/constants';

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
