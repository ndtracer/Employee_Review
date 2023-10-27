import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { LocationsModule } from './locations/locations.module';
import { DepartmentsModule } from './departments/departments.module';




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsRoutingModule,
        LocationsModule,
        DepartmentsModule,

    ],
    declarations: [
        SettingsComponent,
        // LocationsAddEditComponent,


    ],
})
export class SettingsModule { }
