import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Location } from '../_models';



@Injectable({ providedIn: 'root' })
export class LocationService {
  public locationSubject: BehaviorSubject<Location | null>;
  public location: Observable<Location | null>;
  private myLocation: Location[] = [];


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

    return this.http.post(`${environment.apiUrl}/locations.json`, location)

  }

  getAll() {

    // console.log(Location)
    // // return this.myLocation.slice()
    // let loca = this.http.get<any>(`${environment.apiUrl}/locations.json`)
    // .pipe(tap(n => console.log(`tap: ${n}`)))
    // console.log()

    // loca.subscribe(n => console.log(`${n}`))
    // console.log()

    // return loca
    return this.http.get<Location[]>((`${environment.apiUrl}/locations.json`))
    .pipe(tap((x) => {
      JSON.parse(JSON.stringify(x))
    }))
    // )))
    // x) => {
    //   console.log(JSON.parse(JSON.stringify(x)))



    //     // console.log(JSON.parse('{"locationName: string}'))
    //     console.log(x)
    //     return x
    // }));
  }




  getById(id: string) {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${id}.json`);
  }

  update(id: string, params: any) {
    return this.http.patch(`${environment.apiUrl}/locations/${id}.json`, params)
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
    (`${environment.apiUrl}/locations/${id}.json`)
    .pipe(map(x => {
      return x;
    }));
  }
}


function locationDetails(location: any) {
  const { id, locationName } = location;
  return { id, locationName };
}
