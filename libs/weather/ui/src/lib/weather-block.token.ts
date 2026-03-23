import { InjectionToken } from '@angular/core';
import { WeatherData } from '@weather/state';

export interface WeatherBlock {
  label: string;
  icon: string;
  getValue: (data: WeatherData) => string;
}

export const WEATHER_BLOCKS = new InjectionToken<WeatherBlock[]>('WEATHER_BLOCKS');
