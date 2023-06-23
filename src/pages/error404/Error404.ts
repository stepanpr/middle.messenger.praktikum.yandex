import Block from '../../shared/lib/Block';
import Button from '../../shared/ui/Button/Button';
import Router from '../../app/Router';
import error404Template from './error404.hbs';
import './error404.less';

class Error404 extends Block {
    constructor(props: Record<string, any> = {}) {
        const backToChatsButton = new Button({
            text: 'Назад к чатам',
            type: 'submit',
            events: {
                click: () => Router.go('/messenger'),
            },
            styles: {
                button: 'error404__back-to-chats profile__btn-link',
            },
        });

        super({ ...props, backToChatsButton });
    }

    render(): DocumentFragment {
        return this.compile(error404Template, this.props);
    }
}

export default Error404;
