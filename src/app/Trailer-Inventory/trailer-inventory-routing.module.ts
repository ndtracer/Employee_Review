import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailerInventoryComponent } from './trailer-inventory.component';

const routes: Routes = [
  {
    path: '', component: TrailerInventoryComponent,
    children: [
      { path: '', component: TrailerInventoryComponent },
      // { path: 'add', component: EmployeeAddEditComponent },
      // { path: 'edit/:id', component: EmployeeAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailerInventoryRoutingModule { }
