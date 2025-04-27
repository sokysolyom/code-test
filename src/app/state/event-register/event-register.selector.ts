import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import {
  IEventRegisterAccommodationState,
  IEventRegisterEventState,
  IEventRegisterParticipationState,
  IEventRegisterPayerState,
  IEventRegisterPaymentState,
  IParticipantState,
  IRegistrationSettings,
  ISubmissionSettings,
  IWorkplaceState,
} from './event-register.reducer';

export const selectEventRegister = (
  state: IAppState,
): IAppState['eventRegister'] => state.eventRegister;

export const eventRegisterSelector = createSelector(
  selectEventRegister,
  state => state,
);

export const eventRegisterPayerSelector = createSelector(
  selectEventRegister,
  (state): IEventRegisterPayerState => state.payer || {},
);

export const eventRegisterAccommodationSelector = createSelector(
  selectEventRegister,
  (state): IEventRegisterAccommodationState => state.accommodation || {},
);

export const eventRegisterParticipationSelector = createSelector(
  selectEventRegister,
  (state): IEventRegisterParticipationState => state.participation || {},
);

export const eventRegisterEventSelector = createSelector(
  selectEventRegister,
  (state): IEventRegisterEventState => state.event || {},
);

export const eventRegisterPaymentSelector = createSelector(
  selectEventRegister,
  (state): IEventRegisterPaymentState => state.payment || {},
);

export const eventRegisterParticipantSelector = createSelector(
  selectEventRegister,
  (state): IParticipantState => state.participant || {},
);

export const eventRegisterWorkplaceSelector = createSelector(
  selectEventRegister,
  (state): IWorkplaceState => state.workplace || {},
);

export const eventRegisterRegistrationSettingsSelector = createSelector(
  selectEventRegister,
  (state): IRegistrationSettings => state.registrationSettings || {},
);

export const eventRegisterSubmissionSettingsSelector = createSelector(
  selectEventRegister,
  (state): ISubmissionSettings => state.submissionSettings || {},
);
