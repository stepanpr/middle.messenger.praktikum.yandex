import Auth from '../pages/auth/Auth';
import Register from '../pages/register/Register';
import ProfileLayout from '../pages/profile/ProfileLayout';
import Chat from '../pages/chat/Chat';
import Error404 from '../pages/error404/Error404';
import Error500 from '../pages/error500/Error500';
import Router from './Router';

export enum ROUTES {
    SIGNIN = '/sign-in',
    SIGNUP = '/sign-up',
    SETTINGS = '/settings',
    SETTINGS_EDIT = '/settings-edit',
    SETTINGS_EDIT_PASS = '/settings-edit-pass',
    MESSENGER = '/messenger',
    ERROR_404 = '/404',
    ERROR_500 = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {
    Router.use('/', Auth)
        .use(ROUTES.SIGNIN, Auth)
        .use(ROUTES.SIGNUP, Register)
        .use(ROUTES.SETTINGS, ProfileLayout)
        .use(ROUTES.SETTINGS_EDIT, ProfileLayout)
        .use(ROUTES.SETTINGS_EDIT_PASS, ProfileLayout)
        .use(ROUTES.MESSENGER, Chat)
        .use(ROUTES.ERROR_404, Error404)
        .use(ROUTES.ERROR_500, Error500)
        .start();
});
