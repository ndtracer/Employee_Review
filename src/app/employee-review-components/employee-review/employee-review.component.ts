import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService } from 'src/app/_services';

@Component({
  selector: 'app-employee-review',
  templateUrl: './employee-review.component.html',
  styleUrls: ['./employee-review.component.css'],
})
export class EmployeeReviewComponent implements OnInit {
  employees?: any[];
  locations?: any[];
  departmentManagers?: any[];


  titleId = 'Worksite';

  constructor( private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.employeeService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);

  }
}


