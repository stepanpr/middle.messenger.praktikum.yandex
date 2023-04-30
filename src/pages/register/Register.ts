import registerTemplate from './register.hbs';
import './register.less';

const Register = () => {
    const context = { action: 'Зарегестрироваться', additionalAction: 'Войти' };

    return registerTemplate(context);
};

export default Register;
