import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';

export const selectAuth = (state: IAppState): IAppState['auth'] => state.auth;

export const authSelector = createSelector(
  selectAuth,
  (state): IAppState['auth'] => state,
);

// Access token selector with string return type
export const accessTokenSelector = createSelector(
  selectAuth,
  (state): string => state.accessToken || '', // Use || to ensure a string is returned
);

// Refresh token selector
export const refreshTokenSelector = createSelector(
  selectAuth,
  (state): string | null => state.refreshToken || null, // Return null if undefined
);

// User ID selector
export const userIdSelector = createSelector(
  selectAuth,
  (state): string | null => state.id || null, // Return null if undefined
);

// Role selector
export const roleSelector = createSelector(
  selectAuth,
  (state): string | null => state.role || null, // Return null if undefined
);
