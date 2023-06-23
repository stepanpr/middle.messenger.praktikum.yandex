import Block from '../../shared/lib/Block';
import BackButton from '../../shared/ui/BackButton/BackButton';

//profileLayoutTemplate
import profileLayoutTemplate from './profileLayout.hbs';

//profilePagesTemplates
import ProfileGeneral from './ProfileGeneral/ProfileGeneral';
import ProfileEdit from './profileEdit/ProfileEdit';
import ProfileChangePassword from './profileChangePassword/ProfileChangePassword';

//icons
import arrowLeft_icon from '../../shared/ui/icons/arrow_left_icon.png';

import AuthController from '../../shared/controllers/AuthController';
import store from '../../app/Store';

import './profile.less';
import './profilePages.less';

class ProfileLayout extends Block {
    constructor(props: any) {
        const backButton = new BackButton({});

        const { user } = store.getState();
        if (!user) {
            AuthController.getUser()?.then((data: any) => {
                store.set('user', data);
            });
        }

        /** Функция возвращающая экземпляр класса в соответствии с роутом path. */
        const setProfilePage = () => {
            let profilePage = null;
            if (window.location.pathname === '/settings') {
                profilePage = new ProfileGeneral();
            } else if (window.location.pathname === '/settings-edit') {
                profilePage = new ProfileEdit();
            } else if (window.location.pathname === '/settings-edit-pass') {
                profilePage = new ProfileChangePassword();
            }
            return profilePage;
        };
        super({ profilePage: setProfilePage(), backButton });
    }

    render() {
        return this.compile(profileLayoutTemplate, {
            ...this.props,
            arrowLeft_icon,
        });
    }
}

export default ProfileLayout;
