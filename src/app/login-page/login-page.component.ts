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
    console.log(this.loginForm.value.password)
  }

  // registerNew() {
  //   this.buildForm();
  //   console.log("Work Damnniteintenistni")
  //   console.log(this.loginForm.value.login)
  // }

  invalid = false;
// started here \\
  username: string = "";

  password: string = "";

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Submitting form: ", this.loginForm.value);
      console.log(this.username);
    } else {
      console.error("Form is invalid!");
      this.invalid = !this.invalid
    }
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      login: ["", {validators: Validators.required, updateOn: "submit"}],
      password: ["",{validators: Validators.required, updateOn: "submit"}],

    });
    console.log("DYING")
    console.log(this.loginForm.value.login)
  }


   newUser = false;

  toggleRegister(): void {
    this.newUser = !this.newUser
  }

}
