import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';

import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(
      MarkdownModule.forRoot()
    ),
    provideHttpClient()   // <-- c'est tout ce dont tu as besoin
  ]
})
.catch((err) => console.error(err));
