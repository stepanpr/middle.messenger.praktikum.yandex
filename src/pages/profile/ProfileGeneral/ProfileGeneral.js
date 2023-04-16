import profileTemplate from './profileGeneral.hbs';

const ProfileGeneral = (avatar, name) => {
    const context = { name: name || 'Uniknown', userAvatar: avatar };

    return profileTemplate(context);
};

export default ProfileGeneral;
