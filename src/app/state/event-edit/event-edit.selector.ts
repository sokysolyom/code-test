import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';

export const selectEventEdit = (state: IAppState): IAppState['eventEdit'] =>
  state.eventEdit;

// Access token selector with string return type
export const eventEditIdSelector = createSelector(
  selectEventEdit,
  (state): string => state.id || '', // Use || to ensure a string is returned
);

// Refresh token selector
export const eventEditNameSelector = createSelector(
  selectEventEdit,
  (state): string | null => state.name || null, // Return null if undefined
);

export const eventEditPartnerIdSelector = createSelector(
  selectEventEdit,
  (state): string | null => state.partnerId ?? null,
);

export const eventEditSelect = createSelector(
  selectEventEdit,
  (state): IAppState['eventEdit'] => state,
);

export const eventEditRegistrationSettingsSelector = createSelector(
  selectEventEdit,
  (state): IAppState['eventEdit']['registrationSettings'] | null =>
    state.registrationSettings || null,
);

export const eventEditSubmissionSettingsSelector = createSelector(
  selectEventEdit,
  (state): IAppState['eventEdit']['submissionSettings'] | null =>
    state.submissionSettings || null,
);

export const eventEditAccommodationSettingsSelector = createSelector(
  selectEventEdit,
  (state): IAppState['eventEdit']['accommodationSettings'] | null =>
    state.accommodationSettings || null,
);
