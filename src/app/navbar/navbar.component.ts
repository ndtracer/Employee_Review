import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
      this.accountService.userSubject.subscribe((user) => {
        this.isAuthenticated = !!user});
      }

    ngOnDestroy(): void {
        this.accountService.userSubject.unsubscribe()
      }

  logout() {
    this.accountService.logout();
  }
}
