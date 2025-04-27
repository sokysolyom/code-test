import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IPartnerObject } from './partners.reducer';

export const selectPartners = (state: IAppState): IAppState['partners'] =>
  state.partners;

export const partnersSelector = createSelector(
  selectPartners,
  (state): IPartnerObject[] => state.partners || [],
);
