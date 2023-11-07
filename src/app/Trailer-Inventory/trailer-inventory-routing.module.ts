import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailerInventoryComponent } from './trailer-inventory.component';
import { TrailerAddEditComponent } from './trailer-add-edit.component';

const routes: Routes = [
  {
    path: '', component: TrailerInventoryComponent,
    children: [
      { path: '', component: TrailerInventoryComponent },
      { path: 'add', component: TrailerAddEditComponent },
      { path: 'edit/:id', component: TrailerAddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailerInventoryRoutingModule { }
