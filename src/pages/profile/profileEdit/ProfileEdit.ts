import Block from '../../../shared/lib/Block';
import profileEditTemplate from './profileEdit.hbs';

interface IProfileEditProps {
    userAvatar?: File | string;
}

class ProfileEdit extends Block {
    constructor(props?: IProfileEditProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(profileEditTemplate, { ...this.props });
    }
}

export default ProfileEdit;
