import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { ENVIRONMENT } from '@core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from '@shell';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { WEATHER_BLOCKS, TemperatureBlock, HumidityBlock, WindBlock } from '@weather/ui';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ENVIRONMENT, useValue: environment },
    { provide: WEATHER_BLOCKS, useValue: [TemperatureBlock, HumidityBlock, WindBlock] },
  ],
})
export class AppModule {}
