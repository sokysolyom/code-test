/* eslint-disable unicorn/prefer-top-level-await */
import { bootstrapApplication } from '@angular/platform-browser';
import { IconLoaderService } from '@app/core/utils/icon-loader.service';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

void bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const iconLoaderService = appRef.injector.get(IconLoaderService);
    iconLoaderService.loadIcons();
  })
  .catch();
