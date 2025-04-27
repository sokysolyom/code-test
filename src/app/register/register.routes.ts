import { Route } from '@angular/router';
import { RegisterRoleGuard } from '@app/core/guards/register-role.guard';
import { IsLoggedInGuard } from '@app/core/guards/is-logged-in.guard';
import { DisabledRegisterGuard } from '../core/guards/disabled-register.guard';

export const REGISTER_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'prehlad',
    pathMatch: 'full',
  },
  {
    path: 'prehlad',
    loadComponent: () =>
      import('./components/register-overview/register-overview.component').then(
        m => m.RegisterOverviewComponent,
      ),
    canActivate: [DisabledRegisterGuard, IsLoggedInGuard],
  },
  {
    path: 'zdravotnik',
    loadComponent: () =>
      import(
        './components/participant-register/participant-register.component'
      ).then(m => m.ParticipantRegisterComponent),
    canActivate: [DisabledRegisterGuard, IsLoggedInGuard],
  },
  {
    path: 'zastupca',
    loadComponent: () =>
      import(
        './components/representative-register/representative-register.component'
      ).then(m => m.RepresentativeRegisterComponent),
    canActivate: [DisabledRegisterGuard, RegisterRoleGuard, IsLoggedInGuard],
  },
  {
    path: 'potvrdenie',
    loadComponent: () =>
      import(
        './components/participant-registration-confirm/participant-registration-confirm.component'
      ).then(m => m.ParticipantRegistrationConfirmComponent),
  },
];
