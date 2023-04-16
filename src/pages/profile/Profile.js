//profileLayoutTemplate
import profileTemplate from './profile.hbs';

//profilePagesTemplates
import ProfileGeneral from './ProfileGeneral/ProfileGeneral';
import ProfileEdit from './profileEdit/ProfileEdit';
import ProfileChangePassword from './profileChangePassword/ProfileChangePassword';
import ProfileUploadAvatar from './profileUploadAvatar/ProfileUploadAvatar';

//icons
import arrowLeft_icon from './../../../static/images/arrow_left_icon.png';
import noAvatar_icon from './../../../static/images/no_avatar_icon.png';

import './profile.less';
import './profilePages.less';

const Profile = (path) => {
    /** Признак открытия модалки загрузки аватара. */
    let isUploadAvatarModalOpen = false;

    let profilePage = null;

    if (path === 'profile') {
        profilePage = ProfileGeneral(noAvatar_icon, 'Иван'); //пока что передаем дефолтный аватар
    } else if (path === 'profile-edit') {
        profilePage = ProfileEdit(noAvatar_icon);
    } else if (path === 'profile-change-password') {
        profilePage = ProfileChangePassword(noAvatar_icon);
    }

    console.log(path);

    const context = { arrowLeft_icon, profilePage, profileUploadAvatarModal: (isUploadAvatarModalOpen && ProfileUploadAvatar()) || null };

    return profileTemplate(context);
};

export default Profile;
