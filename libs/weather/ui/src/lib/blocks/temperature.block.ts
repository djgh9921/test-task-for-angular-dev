import { WeatherBlock } from '../weather-block.token';

export const TemperatureBlock: WeatherBlock = {
  label: 'Temperature',
  icon: '🌡️',
  getValue: (data) => `${data.temperature}°C`,
};
