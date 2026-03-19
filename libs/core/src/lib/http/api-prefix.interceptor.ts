import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../environment.token';

@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  private env = inject(ENVIRONMENT);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: this.env.serverUrl + request.url });
    }
    return next.handle(request);
  }
}
