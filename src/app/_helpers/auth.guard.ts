import { Injectable, inject } from "@angular/core";
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { map, take } from 'rxjs';
import { AccountService } from '../_services';

// @Injectable({ providedIn: 'root'})
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;

      if(isAuth) {
        if (route.routeConfig?.path === 'account/login') {
          return router.createUrlTree(['/']);
        }
        return true;
      } else {
        if (route.routeConfig?.path === 'account') {
          return true;
        }

        return router.createUrlTree(['/account/login'])
      }
    })
  );
}
//   constructor (
//     private router: Router,
//     private accountService: AccountService
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const user = this.accountService.userValue;
//     if (user) {
//       // authorised so return true
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url}});
//     return false;
//   }
// }
