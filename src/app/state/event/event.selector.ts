import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';

export const selectEvent = (state: IAppState): IAppState['event'] =>
  state.event;

export const eventSelector = createSelector(
  selectEvent,
  (state): IAppState['event'] => state,
);

export const eventIdSelector = createSelector(
  selectEvent,
  (state): string => state.eventId,
);

export const eventNameSelector = createSelector(
  selectEvent,
  (state): string => state.name,
);

export const eventHashtagSelector = createSelector(
  selectEvent,
  (state): string => state.hashtag,
);

export const navbarVisibilitySelector = createSelector(
  selectEvent,
  (state): boolean => state.navbarVisible,
);

export const sidenavVisibilitySelector = createSelector(
  selectEvent,
  (state): boolean => state.sidenavOpen,
);

export const activeDropDownSelector = createSelector(
  selectEvent,
  (state): boolean => state.activeDropDown,
);

export const isAuthedSelector = createSelector(
  selectEvent,
  (state): boolean => state.isAuthed,
);

export const isDataChangedSelector = createSelector(
  selectEvent,
  (state): boolean => state.isDataChanged,
);
