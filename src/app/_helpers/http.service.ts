import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class HTTPService {
  // Variables
  firebaseRootURL = "https://employee-review-app-1-default-rtdb.firebaseio.com/";

  constructor(
    private http: HttpClient,

  ) {}

}
