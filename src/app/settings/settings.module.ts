import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent
    ],
})
export class SettingsModule { }
