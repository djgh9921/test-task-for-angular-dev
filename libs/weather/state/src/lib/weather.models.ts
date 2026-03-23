export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  time: string;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  city: string;
}

export interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
}

export interface OpenMeteoCurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  time: string;
}

export interface OpenMeteoResponse {
  current: OpenMeteoCurrentWeather;
}

export interface GeocodingCity {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
}

export interface GeocodingResponse {
  results: GeocodingCity[];
}
