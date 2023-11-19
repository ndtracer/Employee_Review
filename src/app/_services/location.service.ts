import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Location } from '../_models';



@Injectable({ providedIn: 'root' })
export class LocationService {
  public locationSubject: BehaviorSubject<Location | null>;
  public location: Observable<Location | null>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.locationSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('location')!));
    this.location = this.locationSubject.asObservable();
  }

  public get locationValue() {
    return this.locationSubject.value;
  }

  register(location: Location) {
    console.log(location)
    return this.http.put(`${environment.apiUrl}/locations.json + ${environment.AUTH_API_KEY}`, location)

  }

  getAll() {
    return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
  }

  getById(id: string) {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/locations/${id}`, params)
    .pipe(map(x => {
        // update local storage
        const location = { ...this.locationValue, ...params };
        localStorage.setItem('location', JSON.stringify(location));

        // publish updated location to subscribers
        this.locationSubject.next(location);
      return x;
    }));
  }

  delete(id: string) {
    return this.http.delete
    (`${environment.apiUrl}/locations/${id}`)
    .pipe(map(x => {
      return x;
    }));
  }
}
