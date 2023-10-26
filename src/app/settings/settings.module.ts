import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { LocationsModule } from './locations/locations.module';
// import { LocationsAddEditComponent } from './locations/locations-add-edit.component';





@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsRoutingModule,
        LocationsModule,


    ],
    declarations: [
        SettingsComponent,
        // LocationsAddEditComponent,


    ],
})
export class SettingsModule { }
