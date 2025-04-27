import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

export const EVENT_DETAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/event-detail-overview/event-detail-overview.component'
      ).then(c => c.EventDetailOverviewComponent),
    data: { breadcrumb: 'none' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'stats',
        loadComponent: () =>
          import(
            './components/event-detail-stats/event-detail-stats.component'
          ).then(c => c.EventDetailStatsComponent),
        data: { breadcrumb: 'Detail podujatia' },
        canActivate: [AuthGuard],
      },
      {
        path: 'confirmation-and-docs',
        loadComponent: () =>
          import(
            './components/event-detail-confirmation-n-docs/event-detail-confirmation-n-docs.component'
          ).then(c => c.EventDetailConfirmationNDocsComponent),
        data: { breadcrumb: 'Potvrdenia a dokumenty' },
        canActivate: [AuthGuard],
      },
      {
        path: 'photos-and-videos',
        loadComponent: () =>
          import(
            './components/event-detail-photos-n-videos/event-detail-photos-n-videos.component'
          ).then(c => c.EventDetailPhotosNVideosComponent),
        data: { breadcrumb: 'Fotografie a videá' },
        canActivate: [AuthGuard],
      },
    ],
  },
];
