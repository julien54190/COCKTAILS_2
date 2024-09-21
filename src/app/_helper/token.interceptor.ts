import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TokenService } from '../_services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService){}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    // Si token à inserer dans le header
    if (token !== null) {
      const clone = req.clone({
        headers: req.headers.set('Authorization', 'bearer '+token)
      });
      console.log(clone)
      return next.handle(clone)
    }
    return next.handle(req);
  }
}
