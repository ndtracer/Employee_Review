import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InventoryRoutingModule
    ],
    declarations: [
        InventoryComponent,

    ]
})
export class InventoryModule { }
