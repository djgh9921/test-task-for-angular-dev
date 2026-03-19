import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  version: string;
  serverUrl: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
