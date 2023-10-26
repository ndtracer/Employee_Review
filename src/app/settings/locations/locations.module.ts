import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationsAddEditComponent } from './locations-add-edit.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocationsRoutingModule,

    ],
    exports:[
      // LocationsComponent,
      // LocationsAddEditComponent,

    ],

    declarations: [
        LocationsComponent,
        LocationsAddEditComponent

    ],
})
export class LocationsModule { }
