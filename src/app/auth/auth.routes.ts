import { Route } from '@angular/router';
import { RequireAuthGuard } from '@app/core/guards/require-auth.guard';
import { DisabledRegisterGuard } from '../core/guards/disabled-register.guard';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'prehlad',
    pathMatch: 'full',
  },
  {
    path: 'prihlasenie',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
    canActivate: [DisabledRegisterGuard, RequireAuthGuard],
  },
  {
    path: 'nove-heslo',
    loadComponent: () =>
      import('./components/new-password/new-password.component').then(
        m => m.NewPasswordComponent,
      ),
  },
  {
    path: 'reset-heslo',
    loadComponent: () =>
      import('./components/reset-password/reset-password.component').then(
        m => m.ResetPasswordComponent,
      ),
  },
  {
    path: 'prehlad',
    loadComponent: () =>
      import('./components/auth-overview/auth-overview.component').then(
        m => m.AuthOverviewComponent,
      ),
    canActivate: [DisabledRegisterGuard, RequireAuthGuard],
  },
];
