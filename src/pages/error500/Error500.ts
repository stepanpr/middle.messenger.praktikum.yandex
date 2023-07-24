import Block from '../../shared/lib/Block';
import Button from '../../shared/ui/Button/Button';
import Router from '../../app/Router';
import error500Template from './error500.hbs';
import './error500.less';

class Error500 extends Block {
    constructor(props: Record<string, any> = {}) {
        const backToChatsButton = new Button({
            text: 'Назад к чатам',
            type: 'submit',
            events: {
                click: () => Router.go('/messenger'),
            },
            styles: {
                button: 'error500__back-to-chats profile__btn-link',
            },
        });
        super('div', { ...props, backToChatsButton });
    }

    render(): DocumentFragment {
        return this.compile(error500Template, this.props);
    }
}

export default Error500;
