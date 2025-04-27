import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/profile-overview/profile-overview.component').then(
        c => c.ProfileOverviewComponent,
      ),
    data: { breadcrumb: 'Profil' },
    children: [
      {
        path: 'personal-statements',
        loadComponent: () =>
          import(
            './components/profile-personal-statements/profile-personal-statements.component'
          ).then(c => c.ProfilePersonalStatementsComponent),
        data: { breadcrumb: 'Osobné údaje' },
        canActivate: [AuthGuard],
      },
      {
        path: 'workplace-statements',
        loadComponent: () =>
          import(
            './components/profile-workplace-statements/profile-workplace-statements.component'
          ).then(c => c.ProfileWorkplaceStatementsComponent),
        data: { breadcrumb: 'Údaje o povolaní' },
        canActivate: [AuthGuard],
      },
      {
        path: 'marketing-statements',
        loadComponent: () =>
          import(
            './components/profile-marketing-statements/profile-marketing-statements.component'
          ).then(c => c.ProfileMarketingStatementsComponent),
        data: { breadcrumb: 'Marketingové údaje' },
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import(
        './components/profile-change-password/profile-change-password.component'
      ).then(c => c.ProfileChangePasswordComponent),
    data: { breadcrumb: 'Profil / Zmeniť heslo' },
    canActivate: [AuthGuard],
  },
  {
    path: 'cancel',
    loadComponent: () =>
      import('./components/profile-cancel/profile-cancel.component').then(
        c => c.ProfileCancelComponent,
      ),
    data: { breadcrumb: 'Profil / Zrušiť účet' },
    canActivate: [AuthGuard],
  },
];
