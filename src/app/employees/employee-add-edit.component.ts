import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeeService, AlertService } from '../_services';

@Component({ templateUrl: 'employee-add-edit.component.html' })
export class EmployeeAddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];

      // form with validation rules
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        jobTitle: ['', Validators.required],
        department: ['', Validators.required],
        manager: ['', Validators.required],
        location: ['', Validators.required],

      });

      this.title = 'Add Employee'
      if (this.id) {
        // edit mode
        this.title = 'Edit Employee';
        this.loading = true;
        this.employeeService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
      }
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

    this.submitting = true;
    this.saveEmployee()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Employee saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/employees');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveEmployee() {
    // create or update Employee based on id param
    return this.id
      ? this.employeeService.update(this.id!, this.form.value)
      : this.employeeService.register(this.form.value);
  }
}
