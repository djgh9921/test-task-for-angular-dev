import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LoginComponent } from './login.component';

export const AUTH_ROUTES: Routes = [{ path: 'login', component: LoginComponent, data: { title: marker('Login') } }];
