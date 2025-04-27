import { createAction, props } from '@ngrx/store';
import { IPartnersState } from './partners.reducer';

export const postPartnersData = createAction(
  '[Partners] Update Partners Data',
  props<{ content: IPartnersState }>(),
);

export const removePartnersData = createAction(
  '[Partners] Remove Partners Data',
);
