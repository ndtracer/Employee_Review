
// import { EmployeeReviewComponent } from './employee-review-components/employee-review/employee-review.component';
import { NavbarComponent } from './navbar/navbar.component';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
// import { TrailerInventoryModule } from './trailer-Inventory/trailer-inventory.module';
// import { InventoryComponent } from './inventory/inventory/inventory.component';
// import { MaintenanceComponent } from './maintenance/maintenance.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        // TrailerInventoryModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        // EmployeeReviewComponent,
        NavbarComponent,

        // InventoryComponent,
        // MaintenanceComponent

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
