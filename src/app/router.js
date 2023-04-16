import Auth from '../pages/auth/Auth';
import Register from '../pages/register/Register';
import Profile from '../pages/profile/Profile';
import Chat from '../pages/chat/Chat';
import Error404 from '../pages/error404/Error404';
import Error500 from '../pages/error500/Error500';

/** Маршруты приложения. */
export const ROUTES = [
    { path: '/' },
    { path: '/register' },
    { path: '/profile' },
    { path: '/profile-edit' },
    { path: '/profile-change-password' },
    { path: '/chat' },
    { path: '/error404' },
    { path: '/error500' },
];

/** Маршрутизатор. */
export const router = () => {
    /** Корневой элемент приложения. */
    let root = document.getElementById('root');

    /** Обработчик маршрутов. */
    const routing = (path) => {
        if (path === '/') root.innerHTML = Auth();
        if (path === '/register') root.innerHTML = Register();
        if (path === '/profile') root.innerHTML = Profile('profile');
        if (path === '/profile-edit') root.innerHTML = Profile('profile-edit');
        if (path === '/profile-change-password') root.innerHTML = Profile('profile-change-password');
        if (path === '/chat') root.innerHTML = Chat();
        if (path === '/error404') root.innerHTML = Error404();
        if (path === '/error500') root.innerHTML = Error500();
    };

    let route = ROUTES.find((route) => route.path == window.location.pathname);
    console.log(route);
    if (route && route.path) {
        routing(route.path); //Вызов обработчика маршрута.
    } else {
        routing('/error404'); //Страница ошибки если маршрут не найден.
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
