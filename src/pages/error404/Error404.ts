import error404Template from './error404.hbs';
import './error404.less';

const Error404 = () => {
    const context = {};

    return error404Template(context);
};

export default Error404;
