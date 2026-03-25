import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { WEATHER_BLOCKS } from '@weather/ui';
import { WeatherStore } from '@weather/state';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const quoteServiceMock = {
    getRandomQuote: jest.fn(() => of('a random quote')),
  };
  const weatherStoreMock = {
    loadWeather: jest.fn(),
    searchCity: jest.fn(),
    loading: () => false,
    error: (): string | null => null,
    data: (): null => null,
    city: () => 'Kyiv',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        { provide: QuoteService, useValue: quoteServiceMock },
        { provide: WeatherStore, useValue: weatherStoreMock },
        { provide: WEATHER_BLOCKS, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads a quote on init', () => {
    expect(quoteServiceMock.getRandomQuote).toHaveBeenCalledWith({ category: 'dev' });
  });
});
