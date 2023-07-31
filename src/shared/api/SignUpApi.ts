import HTTPTransport from '../lib/HTTPTransport';
import { BaseAPI } from './BaseAPI';
import { API_URL } from '../../shared/constants';

/** Интерфейс формы регистрации. */
export interface RegisterFormDataInterface {
    [x: string]: string;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export class SignupApi extends BaseAPI {
    create(data: RegisterFormDataInterface): Promise<unknown> | undefined {
        if (!data) return;
        return new HTTPTransport().post(`${API_URL}/auth/signup`, {
            data,
            headers: { 'content-type': 'application/json' },
        });
    }
}
