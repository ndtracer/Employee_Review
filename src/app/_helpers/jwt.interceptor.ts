import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AccountService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const modifiedReq = this.accountService.userSubject.pipe(
        take(1),
        exhaustMap((user) => {
          if (!user) return next.handle(req);

          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token),
          });

          return next.handle(modifiedReq);
        })
      );

      return modifiedReq;
    }


    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // add auth header with jwt if user is logged in and request is to the api url
    //     const user = this.accountService.userValue;
    //     const isLoggedIn = user && user.token;
    //     const isApiUrl = request.url.startsWith(environment.apiUrl);
    //     if (isLoggedIn && isApiUrl) {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         });
    //     }

    //     return next.handle(request);
    // }
}
