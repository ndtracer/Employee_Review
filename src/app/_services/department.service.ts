import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Department } from '../_models';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  public departmentSubject: BehaviorSubject<Department | null>;
  public department: Observable<Department | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.departmentSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('department')!));
    this.department = this.departmentSubject.asObservable();
  }

  public get departmentValue() {
    return this.departmentSubject.value;
  }


  register(department: Department) {

    return this.http.post(`${environment.apiUrl}/departments/register`, department);
  }

  getAll() {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`);
  }

  getById(id: string) {
    return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/departments/${id}`, params)
    .pipe(map(x => {
        // update local storage
        const department = { ...this.departmentValue, ...params };
        localStorage.setItem('department', JSON.stringify(department));

        // publish updated department to subscribers
        this.departmentSubject.next(department);
      return x;
    }));
  }

  delete(id: string) {
    return this.http.delete
    (`${environment.apiUrl}/departments/${id}`)
    .pipe(map(x => {
      return x;
    }));
  }
}
