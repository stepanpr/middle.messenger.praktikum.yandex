import Auth from '../pages/auth/Auth';
import Register from '../pages/register/Register';
import ProfileLayout from '../pages/profile/ProfileLayout';
import Chat from '../pages/chat/Chat';
import Error404 from '../pages/error404/Error404';
import Error500 from '../pages/error500/Error500';
import Router from './Router';
import Block from './../shared/lib/Block';
import { ROUTES } from '../shared/constants';

window.addEventListener('DOMContentLoaded', async () => {
    return Router.use('/', Auth as typeof Block)
        .use(ROUTES.SIGNIN, Auth as typeof Block)
        .use(ROUTES.SIGNUP, Register)
        .use(ROUTES.SETTINGS, ProfileLayout)
        .use(ROUTES.SETTINGS_EDIT, ProfileLayout)
        .use(ROUTES.SETTINGS_EDIT_PASS, ProfileLayout)
        .use(ROUTES.MESSENGER, Chat as typeof Block)
        .use(ROUTES.ERROR_404, Error404 as typeof Block)
        .use(ROUTES.ERROR_500, Error500 as typeof Block)
        .start();
});
