import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
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
