import { InjectionToken } from '@angular/core';

export interface WeatherConfig {
  defaultLatitude: number;
  defaultLongitude: number;
  defaultCity: string;
}

export const WEATHER_CONFIG = new InjectionToken<WeatherConfig>('WEATHER_CONFIG', {
  factory: () => ({
    defaultLatitude: 50.45,
    defaultLongitude: 30.52,
    defaultCity: 'Kyiv',
  }),
});
