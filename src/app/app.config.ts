import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_BASE_URL } from './tooken/api-token';
import { enviroment } from './enviroments/enviroment.prod';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) ),
     importProvidersFrom([BrowserAnimationsModule]),
     provideToastr(),
    {
      provide: API_BASE_URL,
      useValue:enviroment.baseURL ,

    },
    ]

};
