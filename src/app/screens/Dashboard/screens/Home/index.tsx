import React, { useEffect } from 'react';
import i18next from 'i18next';

import withProvider from '~components/ProviderWrapper';
import { actionCreators as authActions } from '~contexts/UserContext/reducer';
import { useDispatch as useUserDispatch } from '~contexts/UserContext';
import { logout, removeCurrentUser } from '~services/AuthServices';
import { useLazyRequest } from '~app/hooks/useRequest';
import Loading from '~components/Spinner/components/loading';

import Card from './components/Card';
import styles from './styles.module.scss';
import { Context, useDispatch } from './context';
import { reducer, INITIAL_STATE, actionCreators } from './reducer';

const character = {
  id: 4,
  name: 'Batman',
  photo: 'https://res.cloudinary.com/henryzarza/image/upload/v1566430490/DC%20Comics/Batman_g21b7m.jpg',
  realName: 'Bruce Wayne',
  description:
    'Batman has dedicated his life to an endless crusade, a war on all criminals in the name of his murdered parents, who were taken from him when he was just a child.',
  height: '1.88',
  weight: '95'
};

function Home() {
  // Example of how to use these custom hooks
  // const foo = useSelector(state => state.foo);
  const dispatch = useDispatch();
  const userDispatch = useUserDispatch();
  const [, loading, , logoutRequest] = useLazyRequest({
    request: logout,
    withPostSuccess: () => {
      userDispatch(authActions.resetUser());
      removeCurrentUser();
    }
  });

  useEffect(() => {
    dispatch(actionCreators.setFoo('React'));
  }, [dispatch]);

  const handleLogout = () => {
    userDispatch(authActions.logout());
    logoutRequest(null);
  };

  return loading ? (
    <Loading />
  ) : (
    <main className="column center">
      <div className={`row center wrap ${styles.characterContainer}`}>
        <Card data={character} />
        <Card data={character} />
        <Card data={character} />
        <Card data={character} />
      </div>
      <button type="button" className="button secondary small-title m-bottom-4" onClick={handleLogout}>
        {i18next.t('Home:seeMore')}
      </button>
    </main>
  );
}

export default withProvider({ Context, reducer, initialState: INITIAL_STATE })(Home);
