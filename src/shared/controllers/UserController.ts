import { UserApi } from '../api/UserAPI';
import store from '../../app/Store';
import { parseJson } from '../lib/parseJson';

class UserController {
    getUserAndSave = () => {
        return UserApi.getUser()?.then((data: any) => {
            console.log(data);
            store.set('user', parseJson(data.response));
        });
    };

    changeProfile = (data: any) => {
        const filteredData = Object.keys(data)
            .filter((key) => key !== '' && key !== 'password' && key !== 'avatar')
            .reduce((acc, curr) => ({ ...acc, [curr]: data[curr] }), {});
        return UserApi.changeProfile(filteredData)
            ?.then((data: any) => {
                store.set('user', parseJson(data.response));
                return data;
            })
            .catch((e) => console.log(e.message));
    };

    changePassword = (data: any) => {
        const filteredData = {
            oldPassword: data.oldPassword,
            newPassword: data.password,
        };
        const res = UserApi.changePassword(filteredData);
        return res;
    };

    changeAvatar = (data: any) => {
        return UserApi.changeAvatar(data);
    };

    getUserByLogin = (login: string): Promise<any> => {
        return UserApi.getUserByLogin(login);
    };
}
export default new UserController();
