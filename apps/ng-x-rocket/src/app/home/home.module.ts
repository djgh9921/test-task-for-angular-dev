import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, RouterModule.forChild(HOME_ROUTES), HomeComponent],
})
export class HomeModule {}
