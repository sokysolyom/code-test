import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// env for npm run start:dev
export const environment = {
  production: false,
  baseUrl: `[PLACEHOLDER_DEV_API_URL]`,
  assetsUrl: `[PLACEHOLDER_DEV_ASSETS_URL]`,
  hashtag: '[PLACEHOLDER_HASHTAG]',
  isRegistratDisabled: false,
  isHealthcarePforessionalEventRegistrationDisabled: false,
  sharedSecret: '[PLACEHOLDER_SECRET_KEY_FOR_DEMO_PURPOSES]',
  providers: [
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
  ],
};
