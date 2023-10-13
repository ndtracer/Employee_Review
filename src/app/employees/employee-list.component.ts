import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../_services';

@Component({ templateUrl: 'employee-list.component.html' })
export class EmployeeListComponent implements OnInit {
  employees?: any[];

  constructor( private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.employeeService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
  }

  deleteEmployee(id: string) {
    const employee = this.employees!.find(x => x.id === id);
    employee.isDeleting = true;
    this.employeeService.delete(id)
      .pipe(first())
      .subscribe(() => this.employees = this.employees!.filter(x => x.id !== id));
  }
}
