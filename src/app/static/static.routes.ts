import { Route } from '@angular/router';
import { PartnerAccessAccessGuard } from '../core/guards/partner-tent-access.guard';

export const STATIC_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'uvod',
    pathMatch: 'full',
  },
  {
    path: 'uvod',
    loadComponent: () =>
      import('./components/introduction/introduction.component').then(
        m => m.IntroductionComponent,
      ),
  },
  {
    path: 'miesto-podujatia',
    loadComponent: () =>
      import('./components/venue/venue.component').then(m => m.VenueComponent),
  },
  {
    path: 'ubytovanie',
    loadComponent: () =>
      import('./components/accommodation/accommodation.component').then(
        m => m.AccommodationComponent,
      ),
  },
  {
    path: 'prezentacia',
    loadComponent: () =>
      import('./components/presentation/presentation.component').then(
        m => m.PresentationComponent,
      ),
  },
  {
    path: 'sablony',
    loadComponent: () =>
      import('./components/templates/templates.component').then(
        m => m.TemplatesComponent,
      ),
  },
  {
    path: 'abstrakt',
    loadComponent: () =>
      import('./components/abstract/abstract.component').then(
        m => m.AbstractComponent,
      ),
  },
  {
    path: 'poster',
    loadComponent: () =>
      import('./components/poster/poster.component').then(
        m => m.PosterComponent,
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./components/faq/faq.component').then(m => m.FaqComponent),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        m => m.ContactComponent,
      ),
  },
  {
    path: 'parkovanie',
    loadComponent: () =>
      import('./components/parking/parking.component').then(
        m => m.ParkingComponent,
      ),
  },
  {
    path: 'program',
    loadComponent: () =>
      import('./components/program/program.component').then(
        m => m.ProgramComponent,
      ),
  },
  {
    path: 'partneri',
    loadComponent: () =>
      import('./components/partners/partners.component').then(
        m => m.PartnersComponent,
      ),
  },
  {
    path: 'registracia',
    loadComponent: () =>
      import('./components/register-page/register-page.component').then(
        m => m.RegisterPageComponent,
      ),
  },
  {
    path: 'workshopy',
    loadComponent: () =>
      import('./components/workshop/workshop.component').then(
        m => m.WorkshopComponent,
      ),
  },
  {
    path: 'partner/:id/stanok',
    loadComponent: () =>
      import('./components/partner-page/partner-page.component').then(
        m => m.PartnerPageComponent,
      ),
    canActivate: [PartnerAccessAccessGuard],
  },
  // {
  //   path: 'spolocensky-program',
  //   loadComponent: () =>
  //     import('./components/social-program/social-program.component').then(
  //       m => m.SocialProgramComponent,
  //     ),
  // },
  {
    path: 'maintenance',
    loadComponent: () =>
      import(
        '../shared/components/lock-site-form/lock-site-form.component'
      ).then(m => m.LockSiteFormComponent),
  },
  // {
  //     path: 'spolocensky-program',
  //     component: SocialProgramComponent,
  // },
];
