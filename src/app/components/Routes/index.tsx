import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from '~contexts/UserContext';
import { getCurrentUser } from '~services/AuthServices';
import { actionCreators } from '~contexts/UserContext/reducer';

import Suspense from '../Suspense';

import { ROUTES } from './constants';
import RouteItem from './components/RouteItem';
import styles from './styles.module.scss';

function Routes() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      dispatch(actionCreators.setUser(JSON.parse(currentUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            {ROUTES.map(({ redirectTo, path, ...config }) => (
              <RouteItem key={path} path={path} redirectTo={redirectTo?.(user)} {...config} />
            ))}
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default Routes;
