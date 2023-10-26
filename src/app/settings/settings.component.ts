import { Component,} from '@angular/core';





@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent  {
  locationsList: boolean = false;

  departmentList: boolean = false;

  reviewForm: boolean = false;

  authorizedLoginUsers: boolean = false;

  locationClick () {
    if(this.locationsList== false) {
      this.locationsList = true
      this.departmentList = false
      this.reviewForm = false
      this.authorizedLoginUsers = false
    } else {
      this.locationsList = false
    }
  }

  departmentClick () {
    if(this.departmentList == false) {
      this.departmentList = true
      this.locationsList = false
      this.reviewForm = false
      this.authorizedLoginUsers = false
    } else {
      this.departmentList = false
    }
  }

  formClick () {
    if (this.reviewForm == false) {
      this.reviewForm = true
      this.locationsList = false
      this.authorizedLoginUsers = false
      this.departmentList = false
    } else {
      this.reviewForm = false
    }
  }

  userClick () {
    if (this.authorizedLoginUsers == false) {
      this.authorizedLoginUsers = true
      this.locationsList = false
      this.departmentList = false
      this.reviewForm = false
    } else {
      this.authorizedLoginUsers = false
    }
  }
}
