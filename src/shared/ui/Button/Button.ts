import Block from '../../lib/Block';
import buttonTemplate from './button.hbs';
import './styles.less';

interface ButtonInterface {
    text: string;
    hasSymbol?: boolean;
    type?: 'submit' | 'reset' | 'button';
    events: { [key: string]: (event: Event) => void };
}

class Button extends Block {
    constructor(props: ButtonInterface) {
        super({ ...props });
    }

    render() {
        return this.compile(buttonTemplate, this.props);
    }
}

export default Button;
