import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';

export const selectRegister = (state: IAppState): IAppState['register'] =>
  state.register;

export const registerSelector = createSelector(
  selectRegister,
  (state): IAppState['register'] => state,
);

// Access role selector with string return type
export const registerRoleSelector = createSelector(
  selectRegister,
  (state): string => state.role || '',
);
