import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TranslateDirective } from '@ngx-translate/core';
import { LoaderComponent } from '@shared';
import { WeatherWidgetComponent } from '@weather/ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [TranslateDirective, LoaderComponent, WeatherWidgetComponent],
})
export class HomeComponent implements OnInit {
  private quoteService = inject(QuoteService);

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
