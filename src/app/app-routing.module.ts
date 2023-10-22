import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'employees', loadChildren: employeesModule, canActivate: [AuthGuard] },
    { path: 'inventory', loadChildren: accountModule },
    { path: 'maintenance', loadChildren: accountModule },
    { path: 'trailer-inventory', loadChildren: accountModule },
    { path: 'employee-review', loadChildren: accountModule },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
