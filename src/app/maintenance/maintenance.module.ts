import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaintenanceRoutingModule
    ],
    declarations: [
        MaintenanceComponent,

    ]
})
export class MaintenanceModule { }
