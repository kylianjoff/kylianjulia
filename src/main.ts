import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';

import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection(),...(appConfig.providers || []),
    importProvidersFrom(
      MarkdownModule.forRoot()
    ),
    provideHttpClient()
  ]
})
.catch((err) => console.error(err));
