import { Component } from '@angular/core';

import { AccountService } from '../_services';
import { User } from '../_models';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);

  }

  logout() {
    this.accountService.logout();

}
}
