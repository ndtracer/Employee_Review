import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService } from 'src/app/_services/department.service';
import { AlertService } from 'src/app/_services';

@Component({ selector: 'departments-add-edit', templateUrl: 'departments-add-edit.component.html' })
export class DepartmentsAddEditComponent implements OnInit {
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
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];


      console.log(this.id)

      // form with validation rules
      this.form = this.formBuilder.group({

        departmentName: ['', Validators.required],
        manager: ['', Validators.required],

      });



      this.title = 'Add Department'
      if (this.id) {
        // edit mode
        this.title = 'Edit Department';
        this.loading = true;
        this.departmentService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
        console.log("this one", this.departmentService.getById(this.id))
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
    console.log("hello")
    this.saveDepartment()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Department saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/departments');
        },
        error: error => {

          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveDepartment() {
    // create or update Employee based on id param

    return this.id
      ? this.departmentService.update(this.id!, this.form.value)
      : this.departmentService.register(this.form.value);

  }

}
