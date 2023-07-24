import Block from '../../lib/Block';
import buttonTemplate from './button.hbs';
import './styles.less';

interface ButtonInterface {
    text: string | undefined;
    hasSymbol?: boolean;
    type?: 'submit' | 'reset' | 'button';
    events?: { [key: string]: (event?: Event) => void };
    styles?: Record<string, string>;
}

class Button extends Block {
    constructor(props: ButtonInterface) {
        super( 'div',{ ...props });
    }

    render() {
        return this.compile(buttonTemplate, {
            ...this.props,
            styles: !this.props.styles ? { button: 'buttonTpl' } : this.props.styles,
        });
    }
}

export default Button;
