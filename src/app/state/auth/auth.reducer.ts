import { createReducer, on } from '@ngrx/store';
import {
  postAuthAccessToken,
  postAuthCredentials,
  removeAuthCredentials,
} from './auth.action';

export interface IUserState {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
  id: string;
}

export const initialState: IUserState = {
  accessToken: '',
  refreshToken: '',
  role: '',
  email: '',
  id: '',
};

export const authReducers = createReducer(
  initialState,
  on(postAuthCredentials, (state, { content }) => ({
    ...state,
    accessToken: content.accessToken,
    refreshToken: content.refreshToken,
    role: content.role,
    email: content.email,
    id: content.id,
  })),
  on(postAuthAccessToken, (state, { accessToken }) => ({
    ...state,
    accessToken,
  })),
  on(removeAuthCredentials, state => ({
    ...state,
    accessToken: '',
    refreshToken: '',
    role: '',
    email: '',
    id: '',
  })),
);
