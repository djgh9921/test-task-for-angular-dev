import { Injectable, signal, computed, inject } from '@angular/core';
import { WeatherState, WeatherData } from './weather.models';
import { WeatherService } from './weather.service';
import { WEATHER_CONFIG } from './weather.config';

@Injectable({ providedIn: 'root' })
export class WeatherStore {
  private weatherService = inject(WeatherService);
  private config = inject(WEATHER_CONFIG);

  private state = signal<WeatherState>({
    data: null,
    loading: false,
    error: null,
    city: this.config.defaultCity,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly city = computed(() => this.state().city);

  loadWeather(
    latitude = this.config.defaultLatitude,
    longitude = this.config.defaultLongitude,
    city = this.config.defaultCity,
  ) {
    this.state.update((s) => ({ ...s, loading: true, error: null, city }));

    this.weatherService.getWeather(latitude, longitude).subscribe({
      next: (data: WeatherData) => {
        this.state.update((s) => ({ ...s, data, loading: false }));
      },
      error: (err: Error) => {
        this.state.update((s) => ({ ...s, error: err.message, loading: false }));
      },
    });
  }

  searchCity(cityName: string) {
    this.state.update((s) => ({ ...s, loading: true, error: null }));

    this.weatherService.getWeatherByCity(cityName).subscribe({
      next: ({ data, city }) => {
        this.state.update((s) => ({ ...s, data, city, loading: false }));
      },
      error: (err: Error) => {
        this.state.update((s) => ({ ...s, error: err.message, loading: false }));
      },
    });
  }
}
