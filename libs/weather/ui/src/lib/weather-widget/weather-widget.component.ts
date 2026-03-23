import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '@weather/state';
import { WEATHER_BLOCKS } from '../weather-block.token';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'weather-widget.component.html',
  styleUrls: ['weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  readonly store = inject(WeatherStore);
  readonly blocks = inject(WEATHER_BLOCKS);
  cityInput = '';

  ngOnInit() {
    this.store.loadWeather();
  }

  onSearch() {
    if (!this.cityInput.trim()) return;
    this.store.searchCity(this.cityInput.trim());
    this.cityInput = '';
  }
}
