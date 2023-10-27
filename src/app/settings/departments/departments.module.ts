import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsAddEditComponent } from './departments-add-edit.component';
import { DepartmentsLayoutComponent } from './departments-layout.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DepartmentsRoutingModule,

    ],


    declarations: [
        DepartmentsComponent,
        DepartmentsAddEditComponent,
        DepartmentsLayoutComponent,

    ],
})
export class DepartmentsModule { }
