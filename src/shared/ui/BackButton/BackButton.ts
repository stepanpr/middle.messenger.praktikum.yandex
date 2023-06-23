import Block from '../../lib/Block';
import backButtonTemplate from './backButton.hbs';
import Router from '../../../app/Router';
import arrowLeft_icon from '../icons/arrow_left_icon.png';
import './styles.less';

interface IBackButton {
    backIcon?: string;
    events?: Record<string, (...args: any) => void>;
}

class BackButton extends Block {
    constructor(props: IBackButton) {
        super({
            backIcon: arrowLeft_icon,
            events: {
                click: () => Router.back(),
            },
        });
    }

    render() {
        return this.compile(backButtonTemplate, { ...this.props });
    }
}

export default BackButton;
