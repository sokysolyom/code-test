import { createAction, props } from '@ngrx/store';
import { IUserStateModel } from '@auth/interfaces/auth.type';

export const postAuthCredentials = createAction(
  '[Auth] Post Auth Credentials',
  props<{ content: IUserStateModel }>(),
);

export const removeAuthCredentials = createAction(
  '[Auth] Remove Auth Credentials',
);

export const postAuthAccessToken = createAction(
  '[Auth] Post Auth Access Token',
  props<{ accessToken: string }>(),
);
