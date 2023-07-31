import Block from '../../lib/Block';
import inputTemplate from './Input.hbs';
import './styles.less';

/**
 * @prop name Имя поля.
 * @prop label Лейбл.
 * @prop type Тип поля.
 * @prop events События для валидации.
 */
interface IInputProps {
    name: string;
    label: string | undefined;
    type: string;
    styles?: Record<string, string>;
    fileInputLabel?: string;
    events: {
        change?: (e: Event) => void;
        input?: (e: Event) => void;
    };
}

/** Компонент инпута. */
class Input extends Block {
    constructor(props: IInputProps) {
        let isFile = props.type === 'file' ? true : false;
        super('div', {
            ...props,
            isFile,
        });
    }

    render() {
        return this.compile(inputTemplate, {
            ...this.props,
            styles: !this.props.styles ? { input: 'input-field' } : this.props.styles,
        });
    }
}

export default Input;
