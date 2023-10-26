import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LocationService } from 'src/app/_services/location.service';
import { AlertService } from 'src/app/_services';

@Component({ selector: 'locations-add-edit', templateUrl: 'locations-add-edit.component.html' })
export class LocationsAddEditComponent implements OnInit {
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
    private locationService: LocationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];


      console.log(this.id)

      // form with validation rules
      this.form = this.formBuilder.group({

        location: ['', Validators.required],

      });



      this.title = 'Add Location'
      if (this.id) {
        // edit mode
        this.title = 'Edit Location';
        this.loading = true;
        this.locationService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
        console.log("this one", this.locationService.getById(this.id))
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
    this.saveLocation()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Location saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/locations');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveLocation() {
    // create or update Employee based on id param
    console.log(this.id)
    return this.id
      ? this.locationService.update(this.id!, this.form.value)
      : this.locationService.register(this.form.value);

  }

}
