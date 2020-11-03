import { lazy } from 'react';

import { Nullable } from '~utils/types';
import { User } from '~contexts/UserContext/reducer';

import PATHS from './paths';

const Home = lazy(() => import('../../screens/Dashboard'));
const Login = lazy(() => import('../../screens/Login'));
const Registration = lazy(() => import('../../screens/Registration'));

const MAIN_PUBLIC_PATH = PATHS.login;
const MAIN_PRIVATE_PATH = PATHS.home;

/* When adding routes, add them ABOVE the Home route
 * or it will redirect you to incorrect screens */
export const ROUTES = [
  {
    exact: false,
    path: PATHS.registration,
    component: Registration
  },
  {
    exact: false,
    path: PATHS.login,
    component: Login,
    redirectTo: (user: Nullable<User>) => (user ? MAIN_PRIVATE_PATH : undefined)
  },
  {
    exact: false,
    path: PATHS.home,
    component: Home,
    redirectTo: (user: Nullable<User>) => (user ? undefined : MAIN_PUBLIC_PATH)
  }
];
