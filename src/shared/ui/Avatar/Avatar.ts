import Block from '../../lib/Block';
import avatarTemplate from './avatar.hbs';
import avatarStubIcon from '../../ui/icons/no_avatar_icon.png';
import './style.less';

/**
 * @prop avatarPath Путь к аватару.
 * @prop avatarStubIcon Заглушка если аватар отсутствует.
 * @prop hasModal Признак возможности открытия модального окна для загрузки.
 * @prop styles Стили.
 * @prop events События.
 */
interface IAvatarProps {
    avatarPath?: string;
    avatarStubIcon?: any;
    hasModal?: boolean;
    styles?: Record<string, string>; // TODO
    events?: Record<string, () => void>;
}

class Avatar extends Block {
    constructor(props: IAvatarProps) {
        const url = 'https://ya-praktikum.tech/api/v2/resources';

        super('div', {
            ...props,
            avatarStubIcon: props.avatarStubIcon ? props.avatarStubIcon : avatarStubIcon,
            url,
        });
    }

    render(): DocumentFragment {
        return this.compile(avatarTemplate, {
            ...this.props,
        });
    }
}

export default Avatar;
