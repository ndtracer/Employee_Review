import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', component: SettingsComponent },
      // { path: 'add', component: EmployeeAddEditComponent },
      // { path: 'edit/:id', component: EmployeeAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
