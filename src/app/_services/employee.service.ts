import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Employee } from '../_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  public employeeSubject: BehaviorSubject<Employee | null>;
  public employee: Observable<Employee | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.employeeSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('employee')!));
    this.employee = this.employeeSubject.asObservable();
  }

  public get employeeValue() {
    return this.employeeSubject.value;
  }

  register(employee: Employee) {
    return this.http.post(`${environment.apiUrl}/employees/register`, employee);
  }

  getAll() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
  }

  getById(id: string) {
    return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/employees/${id}`, params)
    .pipe(map(x => {
        // update local storage
        const employee = { ...this.employeeValue, ...params };
        localStorage.setItem('employee', JSON.stringify(employee));

        // publish updated employee to subscribers
        this.employeeSubject.next(employee);
      return x;
    }));
  }

  delete(id: string) {
    return this.http.delete
    (`${environment.apiUrl}/employees/${id}`)
    .pipe(map(x => {

      return x;
    }));
  }
}

