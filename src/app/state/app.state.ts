import { IUserState } from './auth/auth.reducer';
import { IEventEdiState } from './event-edit/event-edit.reducer';
import { IEventRegisterState } from './event-register/event-register.reducer';
import { IEventState } from './event/event.reducer';
import { IPartnersState } from './partners/partners.reducer';
import { IRegisterState } from './register/register.reducer';

export interface IAppState {
  auth: IUserState;
  event: IEventState;
  eventEdit: IEventEdiState;
  eventRegister: IEventRegisterState;
  register: IRegisterState;
  partners: IPartnersState;
}
