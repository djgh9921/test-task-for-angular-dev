import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TranslateDirective } from '@ngx-translate/core';
import { LoaderComponent } from '@shared';
import { WeatherWidgetComponent } from '@weather/ui';
import { BlockBuilderComponent } from '@block-builder';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [TranslateDirective, LoaderComponent, WeatherWidgetComponent, BlockBuilderComponent],
})
export class HomeComponent implements OnInit {
  private quoteService = inject(QuoteService);

  readonly blockBuilderData = {
    name: 'John',
    age: 30,
    city: 'New York',
    child: {
      name: 'Ioana',
      age: 25,
      city: 'Bucharest',
    },
  };

  quote: string | undefined;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
}
