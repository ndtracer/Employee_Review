import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AuthResponseData, AlertService } from '../_services';
import { Observable } from 'rxjs';


@Component({ templateUrl: 'register-user.component.html' })
export class RegisterUserComponent implements OnInit {
  authObsv: Observable<AuthResponseData>;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],

      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // this.accountService.register(this.form.value)

    this.authObsv.subscribe({
      next: () => {
        this.alertService.success('Registration successful', {keepAfterRouteChange: true});
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  }
}
