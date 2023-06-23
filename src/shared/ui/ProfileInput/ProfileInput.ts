import Block from '../../lib/Block';
import inputTemplate from './profileInput.hbs';
import './styles.less';

/**
 * @prop name Имя поля.
 * @prop label Лейбл.
 * @prop type Тип поля.
 * @prop value Значение поля.
 * @prop disabled Признак заблокированного поля.
 * @prop events События для валидации.
 */
interface IProfileInputProps {
    name: string;
    label: string;
    type: string;
    value?: string | null;
    disabled?: boolean; //TODO: Доделать функционал
    events: {
        change?: (e: Event) => void;
        input?: (e: Event) => void;
    };
}

/** Компонент инпута для раздела "Профайл". */
class ProfileInput extends Block {
    constructor(props: IProfileInputProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(inputTemplate, {
            ...this.props,
            isDisabled: this.props.disabled && 'disabled',
        });
    }
}

export default ProfileInput;
