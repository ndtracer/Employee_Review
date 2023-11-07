import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TrailerInventoryRoutingModule } from './trailer-inventory-routing.module';
import { TrailerInventoryComponent } from './trailer-inventory.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TrailerInventoryRoutingModule
    ],
    declarations: [
        TrailerInventoryComponent,

    ]
})
export class TrailerInventoryModule { }
