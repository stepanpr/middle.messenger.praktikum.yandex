import Block from '../../../shared/lib/Block';
import profileChangePasswordTemplate from './profileChangePassword.hbs';

interface IProfileChangePasswordProps {
    userAvatar?: File | string;
}

class ProfileChangePassword extends Block {
    constructor(props?: IProfileChangePasswordProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(profileChangePasswordTemplate, { ...this.props });
    }
}

export default ProfileChangePassword;
