import { InjectionToken } from '@angular/core';
import { JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './shared/services/authentication-data.service';

export const AUTH_API_URL = new InjectionToken<string>('auth api url');

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function jwtOptions(): JwtModuleOptions {
  return {
    config: {
      tokenGetter,
      allowedDomains: environment.allowedDomains
    }
  } as JwtModuleOptions;
}
