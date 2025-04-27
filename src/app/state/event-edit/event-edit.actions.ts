import { createAction, props } from '@ngrx/store';
import {
  IAccommodationSettings,
  IRegistrationSettings,
  ISubmissionSettings,
} from '../event-register/event-register.reducer';
import { IEventEdiState } from './event-edit.reducer';

export const postEventEditData = createAction(
  '[Event Edit] Update Event Edit Data',
  props<{ content: IEventEdiState }>(),
);

export const removeEventEditData = createAction(
  '[Event Edit] Remove Event Edit Data',
);

export const postEventIdData = createAction(
  '[Event Edit] Update Event Id Data',
  props<{ id: string }>(),
);

export const postRegistrationSettings = createAction(
  '[Event Edit] Update Registration Settings',
  props<{ registrationSettings: IRegistrationSettings }>(),
);

export const postSubmissionSettings = createAction(
  '[Event Edit] Update Submission Settings',
  props<{ submissionSettings: ISubmissionSettings }>(),
);

export const postAccommodationSettings = createAction(
  '[Event Edit] Update Accommodation Settings',
  props<{ accommodationSettings: IAccommodationSettings }>(),
);
