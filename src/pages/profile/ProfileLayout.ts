import Block from '../../shared/lib/Block';

//profileLayoutTemplate
import profileLayoutTemplate from './profileLayout.hbs';

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

/** Контекст страниц профиля.
 * @param arrowLeft_icon Иконка для кнопки "Назад".
 * @param profilePage Текущий шаблон страницы Профиля.
 * @param profileUploadAvatarModal Модальное окно загрузки аватара.
 */
interface IProfileLayoutContext {
    arrowLeft_icon?: File | string;
    profilePage?: Block;
    profileUploadAvatarModal?: Block;
}

/** Пропсы лейаута страницы профиля.
 * @prop path Путь соответствующий странице профиля.
 */
interface IProfileProps {
    path: 'profile' | 'profile-edit' | 'profile-change-password';
}

class ProfileLayout extends Block {
    private isUploadAvatarModalOpen: boolean = false;

    constructor(props?: IProfileProps & IProfileLayoutContext) {
        /** Функция возвращающая экземпляр класса в соответствии с роутом path. */
        const setProfilePage = (path: string) => {
            let profilePage = null;
            if (path === 'profile') {
                profilePage = new ProfileGeneral({ userAvatar: noAvatar_icon, name: 'Иван' });
            } else if (path === 'profile-edit') {
                profilePage = new ProfileEdit({ userAvatar: noAvatar_icon });
            } else if (path === 'profile-change-password') {
                profilePage = new ProfileChangePassword({ userAvatar: noAvatar_icon });
            }
            return profilePage;
        };
        super({ profilePage: setProfilePage(props.path) });
    }

    render() {
        return this.compile(
            profileLayoutTemplate,

            {
                ...this.props,
                arrowLeft_icon,
                profileUploadAvatarModal:
                    (this.isUploadAvatarModalOpen && ProfileUploadAvatar()) || null,
            }
        );
    }
}

export default ProfileLayout;
