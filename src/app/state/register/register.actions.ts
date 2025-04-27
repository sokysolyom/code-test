import { createAction, props } from '@ngrx/store';
import { IRegisterState } from './register.reducer';

export const postRegisterRole = createAction(
  '[Auth] Post Register Role',
  props<{ content: IRegisterState }>(),
);

export const removRegisterData = createAction('[Auth] Remove Register Data');
