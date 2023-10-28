import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeReviewComponent } from './employee-review.component';

const routes: Routes = [
  {
    path: '', component: EmployeeReviewComponent,
    children: [
      { path: '', component: EmployeeReviewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeReviewRoutingModule { }
