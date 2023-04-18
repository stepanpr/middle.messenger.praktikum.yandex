import Auth from '../pages/auth/Auth';
import Register from '../pages/register/Register';
import Profile from '../pages/profile/Profile';
import Chat from '../pages/chat/Chat';
import Error404 from '../pages/error404/Error404';
import Error500 from '../pages/error500/Error500';

/** Маршруты приложения. */
export const ROUTES = [
    { path: '/', component: () => Auth() },
    { path: '/register', component: () => Register() },
    { path: '/profile', component: () => Profile('profile') },
    { path: '/profile-edit', component: () => Profile('profile-edit') },
    { path: '/profile-change-password', component: () => Profile('profile-change-password') },
    { path: '/chat', component: () => Chat({ mainName: 'Antonio', mainAvatar: undefined }) },
    { path: '/error404', component: () => Error404() },
    { path: '/error500', component: () => Error500() },
];

/** Маршрутизатор. */
export const Router = () => {
    /** Корневой элемент приложения. */
    let root = document.getElementById('root');

    /** Поиск и обработка маршрута. */
    const component = ROUTES.find((route) => route.path == window.location.pathname)?.component || ROUTES[6].component;

    root.innerHTML = component();
};

window.addEventListener('hashchange', Router);
window.addEventListener('load', Router);
