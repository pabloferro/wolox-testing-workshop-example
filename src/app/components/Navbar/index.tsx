import React from 'react';
import i18next from 'i18next';

import { actionCreators as authActions } from '~contexts/UserContext/reducer';
import { useDispatch as useUserDispatch, useSelector } from '~contexts/UserContext';
import { logout, removeCurrentUser } from '~services/AuthServices';
import { useLazyRequest } from '~app/hooks/useRequest';
import ActivityCheck from '~components/ActivityCheck';
import ToggleSpoilersButton from '~components/ToggleSpoilersButton';

import Greeting from '../Greeting';

import styles from './styles.module.scss';

function Navbar() {
  const userDispatch = useUserDispatch();
  const user = useSelector(state => state.user);
  const [, , , logoutRequest] = useLazyRequest({
    request: logout,
    withPostSuccess: () => {
      userDispatch(authActions.resetUser());
      removeCurrentUser();
    }
  });

  const handleLogout = () => {
    userDispatch(authActions.logout());
    logoutRequest(null);
  };

  return (
    <nav className={`row center ${styles.nav}`}>
      <header className={`row space-between middle ${styles.navContent}`}>
        <div className="column">
          <h1 className="title white-color">{i18next.t('Home:navTitle')}</h1>
          <ActivityCheck />
        </div>
        <div className="row">
          <ToggleSpoilersButton className="m-right-5" />
          <Greeting userName={user.username} />
          <button type="button" className="link white-color small-title" onClick={handleLogout}>
            {i18next.t('Home:logout')}
          </button>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
