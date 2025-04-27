import { createReducer, on } from '@ngrx/store';
import { postRegisterRole, removRegisterData } from './register.actions';

export interface IRegisterState {
  role: string;
}

export const initialState: IRegisterState = {
  role: '',
};

export const registerReducers = createReducer(
  initialState,
  on(postRegisterRole, (state, { content }) => ({
    ...state,
    role: content.role,
  })),
  on(removRegisterData, state => ({
    ...state,
    role: '',
  })),
);
