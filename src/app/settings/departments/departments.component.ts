import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DepartmentService } from 'src/app/_services/department.service';




@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  // styleUrls: ['./departments.component.css'],
})

export class DepartmentsComponent implements OnInit {
  departments?: any[];

  constructor( private departmentService: DepartmentService) {}

  ngOnInit(): void {
      this.departmentService.getAll()
      .pipe(first())
      .subscribe(departments => this.departments = departments);
  }

  deletedepartment(id: string) {
    const department = this.departments!.find(x => x.id === id);
    department.isDeleting = true;
    this.departmentService.delete(id)
      .pipe(first())
      .subscribe(() => this.departments = this.departments!.filter(x => x.id !== id));
  }
}
