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
  isAuthenticated = false

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe((user) => {
        this.isAuthenticated = !!user});
  }

  logout() {
    this.accountService.logout();
  }
}
