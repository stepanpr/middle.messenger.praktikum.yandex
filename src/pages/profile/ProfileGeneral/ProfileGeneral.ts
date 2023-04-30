import profileTemplate from './profileGeneral.hbs';

interface IProfileGeneral {
	avatar: File | string
	name: string
}

const ProfileGeneral = ({avatar, name}: IProfileGeneral) => {
    const context = { name: name || 'Uniknown', userAvatar: avatar };

    return profileTemplate(context);
};

export default ProfileGeneral;
