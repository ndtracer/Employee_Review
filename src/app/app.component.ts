import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
    user?: User | null;
    isAuthenticated = false

    constructor(private accountService: AccountService) {
        this.accountService.userSubject.subscribe((user) => {
          this.isAuthenticated = !!user});


    }

    ngOnInit(): void {
      this.accountService.autoSignInFromLocalStorage();
    }


    logout() {
        this.accountService.logout();

    }
}
