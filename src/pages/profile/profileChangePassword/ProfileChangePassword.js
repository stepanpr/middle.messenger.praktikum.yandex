import profileChangePasswordTemplate from './profileChangePassword.hbs';

const ProfileChangePassword = (avatar) => {
    const context = { userAvatar: avatar };

    return profileChangePasswordTemplate(context);
};

export default ProfileChangePassword;
