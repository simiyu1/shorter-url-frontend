import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;
    const authReq = req.clone({ headers: req.headers.set('Authorization', `ApiKey ${apiKey}`) });
    
    console.log('Modified request:', authReq); // Log the modified request
  

    return next.handle(authReq);
  }
}
