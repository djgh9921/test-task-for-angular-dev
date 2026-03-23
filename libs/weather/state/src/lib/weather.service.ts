import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData, GeocodingResult, OpenMeteoResponse, GeocodingResponse } from './weather.models';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://api.open-meteo.com/v1/forecast';
  private readonly GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  getWeather(latitude: number, longitude: number): Observable<WeatherData> {
    return this.http
      .get<OpenMeteoResponse>(this.API_URL, {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
          timezone: 'auto',
        },
      })
      .pipe(
        map((response) => ({
          temperature: response.current.temperature_2m,
          humidity: response.current.relative_humidity_2m,
          windSpeed: response.current.wind_speed_10m,
          weatherCode: response.current.weather_code,
          time: response.current.time,
        })),
      );
  }

  searchCity(cityName: string): Observable<GeocodingResult> {
    return this.http
      .get<GeocodingResponse>(this.GEO_URL, {
        params: { name: cityName, count: 1 },
      })
      .pipe(
        map((response) => {
          if (!response.results?.length) {
            throw new Error(`City "${cityName}" not found`);
          }
          const { latitude, longitude, name } = response.results[0];
          return { latitude, longitude, name };
        }),
      );
  }

  getWeatherByCity(cityName: string): Observable<{ data: WeatherData; city: string }> {
    return this.searchCity(cityName).pipe(
      switchMap(({ latitude, longitude, name }) =>
        this.getWeather(latitude, longitude).pipe(map((data) => ({ data, city: name }))),
      ),
    );
  }
}
