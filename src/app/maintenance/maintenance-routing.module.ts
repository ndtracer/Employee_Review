import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';

const routes: Routes = [
  {
    path: '', component: MaintenanceComponent,
    children: [
      { path: '', component: MaintenanceComponent },
      // { path: 'add', component: EmployeeAddEditComponent },
      // { path: 'edit/:id', component: EmployeeAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
