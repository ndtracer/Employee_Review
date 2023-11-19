import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component'
import { LoginComponent } from './login.component'
import { RegisterComponent } from './register.component'
import { RegisterUserComponent } from "./register-user.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    RegisterUserComponent
  ]
})
export class AccountModule { }
