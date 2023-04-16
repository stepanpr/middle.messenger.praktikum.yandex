
import error500Template from './error500.hbs';
import './error500.less';
const Error500 = () => {
    const context = { action: 'Зарегестрироваться', additionalAction: 'Войти' };

    return error500Template(context);
};

export default Error500;
