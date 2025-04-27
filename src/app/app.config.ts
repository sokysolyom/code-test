import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from '@env';
import { routes } from './app.routes';
import { authReducers } from './state/auth/auth.reducer';
import { eventReducers } from './state/event/event.reducer';
import { httpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { eventEditReducers } from './state/event-edit/event-edit.reducer';
import { eventRegisterReducers } from './state/event-register/event-register.reducer';
import { registerReducers } from './state/register/register.reducer';
import { partnersReducers } from './state/partners/partners.reducer';
import { signatureInterceptor } from './core/interceptors/signature.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducers,
      event: eventReducers,
      eventEdit: eventEditReducers,
      eventRegister: eventRegisterReducers,
      register: registerReducers,
      partners: partnersReducers,
    }),
    environment.providers,
    provideHttpClient(
      withInterceptors([
        httpRequestInterceptor,
        HttpErrorInterceptor,
        signatureInterceptor,
      ]),
    ),
    { provide: MAT_DATE_LOCALE, useValue: 'sk-SK' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
};
