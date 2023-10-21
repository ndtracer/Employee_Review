import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../_services';

@Component({ selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees?: any[];

  constructor( private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.employeeService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
      // console.log(this.employees)
  }

  deleteEmployee(id: string) {
    const employee = this.employees!.find(x => x.id === id);
    // console.log("hello")
    // console.log(employee)
    employee.isDeleting = true;
    this.employeeService.delete(employee)
      // .pipe(first())
      // .subscribe(() => this.employees = this.employees!.filter(x => x.id !== id));
      // console.log(employee);

  }



}
