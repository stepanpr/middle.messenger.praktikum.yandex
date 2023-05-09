import Block from '../../../shared/lib/Block';
import profileGeneralTemplate from './profileGeneral.hbs';

interface IProfileGeneralProps {
    userAvatar?: File | string;
    name?: string;
}

class ProfileGeneral extends Block {
    constructor(props?: IProfileGeneralProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(profileGeneralTemplate, { ...this.props });
    }
}

export default ProfileGeneral;
