import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsLayoutComponent } from './departments-layout.component';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsAddEditComponent } from './departments-add-edit.component';

const routes: Routes = [
  {
    path: '', component: DepartmentsLayoutComponent,
    children: [
      { path: '', component: DepartmentsComponent },
      { path: 'add', component: DepartmentsAddEditComponent },
      { path: 'edit/:id', component: DepartmentsAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
