import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { usersReducer } from './states/users-slice/users.reducers';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { UsersEffect } from './states/effects/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(StoreModule.forRoot({ data: usersReducer }), EffectsModule.forRoot(UsersEffect), HttpClientModule, StoreDevtoolsModule, FormsModule),
    provideEffects(UsersEffect),
    provideStore({data: usersReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
],
};
