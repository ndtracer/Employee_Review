import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Employee } from '../_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeeSubject: BehaviorSubject<Employee | null>;
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

  // login(id: string, firstName: string, lastName: string, jobTitle: string, department: string, manager: string, location: string) {
  //   return this.http.post<Employee>(`${environment.apiUrl}/employees/authenticate`, { id, firstName, lastName, jobTitle, department, manager, location })
  //   .pipe(map(employee => {
  //     // store employee details and jwt token in local storage to keep employee logged in between page refreshes
  //     localStorage.setItem('employee', JSON.stringify(employee));
  //     this.employeeSubject.next(employee);
  //     return employee;
  //   }));
  // }

  // logout() {
  //   // remove employee from local storage and set current employee to null
  //   localStorage.removeItem('employee');
  //   this.employeeSubject.next(null);
  //   this.router.navigate(['/account/login']);
  // }

  register(employee: Employee) {
    // Add id into here!!
    // const newId = Employee.

    return this.http.post(`${environment.apiUrl}/employees/register`, employee);

  }

  getAll() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
  }

  getById(id: string) {
    return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/employees/edit/${id}`, params)
    .pipe(map(x => {
      // update stored employee if the logged in employee updated their own record
      if (id == this.employeeValue?.id) {
        // update local storage
        const employee = { ...this.employeeValue, ...params };
        localStorage.setItem('employee', JSON.stringify(employee));

        // publish updated employee to subscribers
        this.employeeSubject.next(employee);
      }
      return x;
    }));
  }

  delete(employee: Employee) {
    // this.employeeSubject = null

    console.log(this.employeeSubject)
    console.log(employee)
    console.log(employee.id)
    console.log(this.employee)
    // this.employee.splice(this.employee)
    // localStorage.getItem(JSON.stringify(employee))



    return this.http.delete(`${environment.apiUrl}/employees/${employee.id}`)
    .pipe(map(x => {
      // auto logout if the logged in employee deleted their own record
      // if ( id == this.employeeValue?.id) {
      //   this.logout();
      // }
      return x;
    }));
  }
}

