import { User, Credentials } from '~app/contexts/UserContext/reducer';

import api from '../config/api';

import LocalStorageService from './LocalStorageService';

const TOKEN_FIELD_NAME = 'sessionToken';

export interface LoginError {
  message: string;
}

export const setCurrentUser = (currentUser: User) => {
  api.setHeader('Authorization', currentUser.sessionToken);
  LocalStorageService.setValue(TOKEN_FIELD_NAME, JSON.stringify(currentUser));
};

export const getCurrentUser = () => LocalStorageService.getValue(TOKEN_FIELD_NAME);

export const removeCurrentUser = () => LocalStorageService.removeValue(TOKEN_FIELD_NAME);

export const login = (credentials: Credentials) => api.post<User, LoginError>('/login', credentials);

export const createUser = (credentials: Credentials) => api.post<User, LoginError>('/register', credentials);

export const logout = () => api.get<User, LoginError>('/login');
