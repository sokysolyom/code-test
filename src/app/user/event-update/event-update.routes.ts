import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { HealthcareProfessionalRoleGuard } from '@app/core/guards/healthcare-professional-role.guard';
import { PartnerRoleGuard } from '@app/core/guards/partner-role.guard';
import { SubjectRoleGuard } from '@app/core/guards/subject-role.guard';
import { UpdateStateGuard } from '@app/core/guards/update-state.guard';

export const EVENT_UPDATE_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import(
        './components/event-update-overview/event-update-overview.component'
      ).then(c => c.EventUpdateOverviewComponent),
    data: { breadcrumb: 'Upraviť podujatie' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'participation-type',
        loadComponent: () =>
          import(
            './components/event-update-participation-type/event-update-participation-type.component'
          ).then(c => c.EventUpdateParticipationTypeComponent),
        data: { breadcrumb: 'Typ účasti' },
        canActivate: [AuthGuard, HealthcareProfessionalRoleGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'accommodation',
        loadComponent: () =>
          import(
            './components/event-update-accommodation/event-update-accommodation.component'
          ).then(c => c.EventUpdateAccommodationComponent),
        data: { breadcrumb: 'Ubytovanie a strava' },
        canActivate: [AuthGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'files',
        loadComponent: () =>
          import(
            './components/event-update-files/event-update-files.component'
          ).then(c => c.EventUpdateFilesComponent),
        data: { breadcrumb: 'Abstrakty, prezentácia a postery' },
        canActivate: [AuthGuard, HealthcareProfessionalRoleGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'fees',
        loadComponent: () =>
          import(
            './components/event-update-fees/event-update-fees.component'
          ).then(c => c.EventUpdateFeesComponent),
        data: { breadcrumb: 'Poplatky' },
        canActivate: [AuthGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'confirmation-and-docs',
        loadComponent: () =>
          import(
            './components/event-update-confirmation-n-docs/event-update-confirmation-n-docs.component'
          ).then(c => c.EventUpdateConfirmationNDocsComponent),
        data: { breadcrumb: 'Potvrdenie a dokumenty' },
        canActivate: [AuthGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'contact-form',
        loadComponent: () =>
          import('./components/contant-form/contant-form.component').then(
            c => c.ContantFormComponent,
          ),
        data: { breadcrumb: 'Kontaktný formulár' },
        canActivate: [AuthGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'unsubscribe',
        loadComponent: () =>
          import(
            './components/event-update-unsubscribe/event-update-unsubscribe.component'
          ).then(c => c.EventUpdateUnsubscribeComponent),
        data: { breadcrumb: 'Odhlásiť z podujatia' },
        canActivate: [AuthGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'manage',
        loadComponent: () =>
          import(
            './components/event-update-representative-management/event-update-representative-management.component'
          ).then(c => c.EventUpdateRepresentativeManagementComponent),
        data: { breadcrumb: 'Správa registrácií' },
        canActivate: [AuthGuard, SubjectRoleGuard],
        canDeactivate: [UpdateStateGuard],
      },
      {
        path: 'change-admin',
        loadComponent: () =>
          import(
            './components/event-update-change-admin/event-update-change-admin.component'
          ).then(c => c.EventUpdateChangeAdminComponent),
        data: { breadcrumb: 'Zmena administrátora' },
        canActivate: [AuthGuard, PartnerRoleGuard],
        canDeactivate: [UpdateStateGuard],
      },
    ],
  },
];
