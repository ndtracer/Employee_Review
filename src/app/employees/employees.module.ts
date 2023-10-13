import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeLayoutComponent } from './employee-layout.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmployeesRoutingModule
    ],
    declarations: [
        EmployeeLayoutComponent,
        EmployeeListComponent,
        EmployeeAddEditComponent
    ]
})
export class EmployeesModule { }
