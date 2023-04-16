import authTemplate from './auth.hbs';
import './auth.less';

const Auth = () => {
    const context = { action: 'Авторизоваться', additionalAction: 'Нет аккаунта?' };

    return authTemplate(context);
};

export default Auth;
