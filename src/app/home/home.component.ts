import { Component } from '@angular/core';

import { User } from '../_models';
import { AccountService } from '../_services';

@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.css']})
export class HomeComponent {
    user: User | null;

    constructor(private accountService: AccountService) {
      this.user = this.accountService.userValue;

      console.log(this.user)
    }

    logout() {
      this.accountService.logout();
  }

}
