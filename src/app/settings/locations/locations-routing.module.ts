import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsLayoutComponent } from './locations-layout.component';
import { LocationsComponent } from './locations.component';
import { LocationsAddEditComponent } from './locations-add-edit.component';

const routes: Routes = [
  {
    path: '', component: LocationsLayoutComponent,
    children: [
      { path: '', component: LocationsComponent },
      { path: 'add', component: LocationsAddEditComponent },
      { path: 'edit/:id', component: LocationsAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
