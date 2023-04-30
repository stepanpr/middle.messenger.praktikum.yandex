//profileLayoutTemplate
import profileTemplate from './profile.hbs';

//profilePagesTemplates
import ProfileGeneral from './ProfileGeneral/ProfileGeneral';
import ProfileEdit from './profileEdit/ProfileEdit';
import ProfileChangePassword from './profileChangePassword/ProfileChangePassword';
import ProfileUploadAvatar from './profileUploadAvatar/ProfileUploadAvatar';

//icons
import arrowLeft_icon from '../../shared/ui/icons/arrow_left_icon.png';
import noAvatar_icon from '../../shared/ui/icons/no_avatar_icon.png';

import './profile.less';
import './profilePages.less';

interface IProfileContext {
    arrowLeft_icon: File | string;
    profilePage: any;
    profileUploadAvatarModal: () => void;
}

interface IProfile {
    path: string;
}

const Profile = ({ path }: IProfile) => {
    /** Признак открытия модалки загрузки аватара. */
    let isUploadAvatarModalOpen = false;

    let profilePage = null;

    if (path === 'profile') {
        profilePage = ProfileGeneral({ avatar: noAvatar_icon, name: 'Иван' }); //пока что передаем дефолтный аватар
    } else if (path === 'profile-edit') {
        profilePage = ProfileEdit(noAvatar_icon);
    } else if (path === 'profile-change-password') {
        profilePage = ProfileChangePassword(noAvatar_icon);
    }

    console.log(path);

    const context: IProfileContext = {
        arrowLeft_icon,
        profilePage,
        profileUploadAvatarModal: (isUploadAvatarModalOpen && ProfileUploadAvatar()) || null,
    };

    return profileTemplate(context);
};

export default Profile;
