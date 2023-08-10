import router from './../../app/Router';
import { UserApi } from '../api/UserAPI';
import UserController from './UserController';
import { ROUTES } from '../constants';
import { parseJson } from '../lib/parseJson';
import { SugninApi } from '../api/SignInApi';
import { SignupApi, RegisterFormDataInterface } from '../api/SignUpApi';

export interface LoginFormDataInterface {
    login: string;
    password: string;
}

class AuthController {
    authUser = (data: LoginFormDataInterface) => {
        const expectedData = Object.keys(data).reduce(
            (acc, curr: keyof LoginFormDataInterface) => ({ ...acc, [curr]: data[curr] }),
            {}
        );
        new SugninApi()
            .create(expectedData as unknown as LoginFormDataInterface)
            ?.then((response: any) => {
                if (response.status !== 200) {
                    throw new Error(parseJson(response.response).reason);
                }
                router.go(ROUTES.MESSENGER);
            })
            .catch((err) => {
                if (err.message === 'User already in system') {
                    router.go(ROUTES.MESSENGER);
                } else {
                    alert(err.message);
                }
            });
    };

    registerUser = (data: RegisterFormDataInterface) => {
        new SignupApi()
            .create(data)
            ?.then((data: any) => {
                if (data.status !== 200) {
                    throw new Error(parseJson(data.response).reason);
                }
                return parseJson(data.response);
            })
            .then(({ id }: { id: number }) => {
                if (typeof id === 'number') {
                    UserController.getUserAndSave();

                    router.go(ROUTES.MESSENGER);
                }
            })
            .catch((err) => alert(err.message));
    };

    getUser = () => {
        return UserApi.getUser()?.then((data: any) => parseJson(data.response));
    };

    logout = () => UserApi.logout();
}

export default new AuthController();
