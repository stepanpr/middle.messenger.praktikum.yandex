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
    label: string;
    type: string;
    events: {
        change?: (e: Event) => void;
        input?: (e: Event) => void;
    };
}

/** Компонент инпута. */
class Input extends Block {
    constructor(props: IInputProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(inputTemplate, { ...this.props });
    }
}

export default Input;
