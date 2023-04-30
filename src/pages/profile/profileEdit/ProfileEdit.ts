import profileEditTemplate from './profileEdit.hbs';

const ProfileEdit = (avatar) => {
    const context = { userAvatar: avatar };

    return profileEditTemplate(context);
};

export default ProfileEdit;
