import { createAction, props } from '@ngrx/store';
import {
  IAccommodationSettings,
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

export const postEventRegisterEvent = createAction(
  '[Event Register] Post Event Register Event',
  props<{ content: IEventRegisterEventState }>(),
);

export const postEventRegisterPayerData = createAction(
  '[Event Register] Post Event Register Payer Data',
  props<{ content: IEventRegisterPayerState }>(),
);

export const postEventRegisterParticipationData = createAction(
  '[Event Register] Post Event Register Participation Data',
  props<{ content: IEventRegisterParticipationState }>(),
);

export const postEventRegisterAccommodationData = createAction(
  '[Event Register] Post Event Register Accommodation Data',
  props<{ content: IEventRegisterAccommodationState }>(),
);

export const postEventregisterAccommodationIsChecked = createAction(
  '[Event Register] Post Event Register Accommodation Is Checked',
  props<{ isChecked: boolean }>(),
);

export const postEventRegisterPaymentData = createAction(
  '[Event Register] Post Event Register Payment Data',
  props<{ content: IEventRegisterPaymentState }>(),
);

export const resetEventRegister = createAction(
  '[Event Register] Reset Event Register',
);

export const postEventRegisterParticipantData = createAction(
  '[Event Register] Post Event Register Participant Data',
  props<{ content: IParticipantState }>(),
);

export const postEventRegisterWorkplaceData = createAction(
  '[Event Register] Post Event Register Workplace Data',
  props<{ content: IWorkplaceState }>(),
);

export const postEvetnRegisterEventLegalPersonId = createAction(
  '[Event Register] Post Event Register Event Legal Person Id',
  props<{ legalPersonId: string }>(),
);

export const postEventRegisterSubmissionSettings = createAction(
  '[Event Register] Post Event Submission Settings',
  props<{ content: ISubmissionSettings }>(),
);

export const postEventRegisterRegistrationSettings = createAction(
  '[Event Register] Post Event Registration Settings',
  props<{ content: IRegistrationSettings }>(),
);

export const postEventRegisterAccommodationSettings = createAction(
  '[Event Register] Post Event Accommodation Settings',
  props<{ content: IAccommodationSettings }>(),
);

export const postEvetnRegisterPaymentRegistrationFee = createAction(
  '[Event Register] Post Event Register Payment Registration Fee',
  props<{ registrationFee: number | null }>(),
);
