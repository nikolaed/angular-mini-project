// cors.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and add the necessary CORS headers
    const corsReq = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
    });

    // Pass the modified request to the next handler
    return next.handle(corsReq);
  }
}
