import { WeatherBlock } from '../weather-block.token';

export const WindBlock: WeatherBlock = {
  label: 'Wind',
  icon: '💨',
  getValue: (data) => `${data.windSpeed} km/h`,
};
