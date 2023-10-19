import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeLayoutComponent } from './employee-layout.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit.component';

const routes: Routes = [
  {
    path: '', component: EmployeeLayoutComponent,
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'add', component: EmployeeAddEditComponent },
      { path: 'edit/:employee.id', component: EmployeeAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
