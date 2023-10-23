import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeReviewRoutingModule } from './employee-review-routing.module';
import { EmployeeReviewComponent } from './employee-review.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmployeeReviewRoutingModule
    ],
    declarations: [
        EmployeeReviewComponent,

    ]
})
export class EmployeeReviewModule { }
