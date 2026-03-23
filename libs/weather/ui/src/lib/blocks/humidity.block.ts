import { WeatherBlock } from '../weather-block.token';

export const HumidityBlock: WeatherBlock = {
  label: 'Humidity',
  icon: '💧',
  getValue: (data) => `${data.humidity}%`,
};
