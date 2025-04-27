import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { HealthcareProfessionalRoleGuard } from '@app/core/guards/healthcare-professional-role.guard';
import { LayoutOverviewComponent } from './components/layout-overview/layout-overview.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: LayoutOverviewComponent,
    data: { breadcrumb: 'none' },
    children: [
      {
        path: 'event',
        loadChildren: () =>
          import('../event/event.routes').then(r => r.EVENT_ROUTES),
        data: { breadcrumb: 'none' },
        canActivate: [AuthGuard],
      },
      {
        path: 'endorsements',
        loadChildren: () =>
          import('../endorsements/endorsements.routes').then(
            r => r.ENDORSEMENTS_ROUTES,
          ),
        data: { breadcrumb: 'none' },
        canActivate: [AuthGuard, HealthcareProfessionalRoleGuard],
      },
      {
        path: 'media',
        loadChildren: () =>
          import('../media/media.routes').then(r => r.MEDIA_ROUTES),
        data: { breadcrumb: 'none' },
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.routes').then(r => r.PROFILE_ROUTES),
        data: { breadcrumb: 'none' },
        canActivate: [AuthGuard],
      },
    ],
  },
];
