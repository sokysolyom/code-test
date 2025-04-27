import { createAction, props } from '@ngrx/store';
import { IEventState } from './event.reducer';

export const postEventDetails = createAction(
  '[Event] Refresh Event Details',
  props<{ content: IEventState }>(),
);

export const updateNavbarVisibility = createAction(
  '[Event] Update Navbar Visibility',
  props<{ content: boolean }>(),
);

export const updateSidenavVisibility = createAction(
  '[Event] Update Sidenav Visibility',
  props<{ content: boolean }>(),
);

export const updateEventName = createAction(
  '[Event] Update Event Name',
  props<{ content: string }>(),
);

export const updateEventHashtag = createAction(
  '[Event] Update Event Hashtag',
  props<{ content: string }>(),
);

export const updateEventId = createAction(
  '[Event] Update Event Id',
  props<{ content: string }>(),
);

export const updateActiveDropDown = createAction(
  '[Event] Update Active Drop Down',
  props<{ content: boolean }>(),
);

export const updateIsAuthed = createAction(
  '[Event] Update Is Authed',
  props<{ content: boolean }>(),
);

export const updateIsDataChanged = createAction(
  '[Event] Update Is Data Changed',
  props<{ content: boolean }>(),
);

export const removeEventDetails = createAction('[Event] Remove Event Details');
