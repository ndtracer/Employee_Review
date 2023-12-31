import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '', component: InventoryComponent,
    children: [
      { path: '', component: InventoryComponent },
      // { path: 'add', component: EmployeeAddEditComponent },
      // { path: 'edit/:id', component: EmployeeAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
