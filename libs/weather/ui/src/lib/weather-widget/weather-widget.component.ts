import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockBuilderComponent, FlatObject } from '@block-builder';
import { WeatherStore } from '../../../../state/src/lib/weather.store';
import { WEATHER_BLOCKS } from '../weather-block.token';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-weather-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, BlockBuilderComponent],
  templateUrl: 'weather-widget.component.html',
  styleUrls: ['weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  readonly store = inject(WeatherStore);
  readonly blocks = inject(WEATHER_BLOCKS);
  readonly blockData = computed<FlatObject>(() => {
    const data = this.store.data();
    if (!data) {
      return {};
    }

    return this.blocks.reduce<FlatObject>((acc, block) => {
      acc[block.label] = block.getValue(data);
      return acc;
    }, {});
  });
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
