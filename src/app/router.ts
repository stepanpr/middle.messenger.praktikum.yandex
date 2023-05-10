import Block from '../shared/lib/Block';

// Импорт классовых компонентов.
import Auth from '../pages/auth/Auth';
import Register from '../pages/register/Register';
import ProfileLayout from '../pages/profile/ProfileLayout';
import Chat from '../pages/chat/Chat';
import Error404 from '../pages/error404/Error404';
import Error500 from '../pages/error500/Error500';

/** Создание экземляров классов разделов чата. */
const AuthUnit: Block = new Auth({ action: 'Авторизоваться', additionalAction: 'Нет аккаунта?' });
const RegisterUnit: Block = new Register({
    action: 'Зарегестрироваться',
    additionalAction: 'Войти',
});
const ProfileGeneralUnit: Block = new ProfileLayout({ path: 'profile' });
const ProfileEditUnit: Block = new ProfileLayout({ path: 'profile-edit' });
const ProfileChangePasswordUnit: Block = new ProfileLayout({ path: 'profile-change-password' });
const ChatUnit: Block = new Chat({ mainName: 'Antonio', mainAvatar: undefined });
const Error404Unit: Block = new Error404();
const Error500Unit: Block = new Error500();

/** Маршруты приложения. */
export const ROUTES = [
    { path: '/', component: AuthUnit },
    { path: '/register', component: RegisterUnit },
    { path: '/profile', component: ProfileGeneralUnit },
    { path: '/profile-edit', component: ProfileEditUnit },
    { path: '/profile-change-password', component: ProfileChangePasswordUnit },
    { path: '/chat', component: ChatUnit },
    { path: '/error404', component: Error404Unit },
    { path: '/error500', component: Error500Unit },
];

/** Маршрутизатор. */
export const Router = () => {
    /** Корневой элемент приложения. */
    let root: HTMLElement | null = document.getElementById('root');

    if (!root) {
        return;
    }

    /** Поиск и обработка маршрута. */
    const component: Block | HTMLElement =
        ROUTES.find((route) => route.path == window.location.pathname)?.component ||
        ROUTES[6].component;

    if (component.getContent()) {
        root?.append(component.getContent() as Node);
    } else {
        root.innerHTML = '';
    }
};

window.addEventListener('hashchange', Router);
window.addEventListener('load', Router);
