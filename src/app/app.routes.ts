import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'general/uvod',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(c => c.AUTH_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.routes').then(r => r.REGISTER_ROUTES),
  },
  {
    path: 'general',
    loadChildren: () =>
      import('./static/static.routes').then(s => s.STATIC_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./user/layout/layout.routes').then(r => r.LAYOUT_ROUTES),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'none' },
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];
