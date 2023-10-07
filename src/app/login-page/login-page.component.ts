import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent
 implements OnInit
{
  @ViewChild(FormGroupDirective, {static: true})
  private formGroupDir: FormGroupDirective;

  loginForm: FormGroup;

  get isFormSubmitted(): boolean {
    return this.formGroupDir.submitted;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  invalid = false;

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Submitting form: ", this.loginForm.value);
    } else {
      console.error("Form is invalid!");
      this.invalid = !this.invalid
    }
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      login: ["", {validators: Validators.required, updateOn: "submit"}],
      password: ["",{validators: Validators.required, updateOn: "submit"}]
    });

  }


   newUser = false;

  toggleRegister(): void {
    this.newUser = !this.newUser
  }
//   loginForm = document.getElementById("login-form");
//   loginButton = document.getElementById("login-form-submit");
//  loginErrorMsg = document.getElementById("login-error-message");

// login(e) {
//     e.preventDefault();
//     const username = this.loginForm.username.value;
//     const password = loginForm.password.value;

//     if (username === "Test" && password === "Pass") {
//         alert("You have successfully logged in.");
//         location.replace("/SelectionPagev4.html");
//     } else {
//         this.loginErrorMsg.style.opacity = 1;
//     }
// }
}
