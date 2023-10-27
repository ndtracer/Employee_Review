import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationsAddEditComponent } from './locations-add-edit.component';
import { LocationsLayoutComponent } from './locations-layout.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocationsRoutingModule,

    ],


    declarations: [
        LocationsComponent,
        LocationsAddEditComponent,
        LocationsLayoutComponent,

    ],
})
export class LocationsModule { }
