import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeReviewRoutingModule } from './employee-review-routing.module';
import { EmployeeReviewComponent } from './employee-review.component';
import { UniqueLocationPipe } from 'src/app/_pipes/employee-locations.pipe';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmployeeReviewRoutingModule
    ],
    declarations: [
        EmployeeReviewComponent,
        UniqueLocationPipe

    ],
})
export class EmployeeReviewModule { }
