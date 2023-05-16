import Block from '../../lib/Block';
import buttonTemplate from './iconButton.hbs';
import './styles.less';

interface IconButtonProps {
    icon: string;
    type?: string;
    events?: { [key: string]: (event: Event) => void };
    styles?: Record<string, string>;
}

class IconButton extends Block {
    constructor(props: IconButtonProps) {
        super({ ...props });
    }

    render(): DocumentFragment {
        return this.compile(buttonTemplate, this.props);
    }
}

export default IconButton;
