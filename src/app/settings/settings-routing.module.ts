import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { LocationsModule } from './locations/locations.module';
import { LocationsAddEditComponent } from './locations/locations-add-edit.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', component: SettingsComponent },
      // { path: 'locations', component: LocationsModule},
      // { path: '/locations/add', component: LocationsAddEditComponent},
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
