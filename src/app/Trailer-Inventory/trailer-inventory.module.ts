import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TrailerInventoryRoutingModule } from './trailer-inventory-routing.module';
import { TrailerInventoryComponent } from './trailer-inventory.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TrailerInventoryRoutingModule
    ],
    declarations: [
        TrailerInventoryComponent,

    ]
})
export class TrailerInventoryModule { }
