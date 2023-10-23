import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { TrailerInventoryModule } from './trailer-Inventory/trailer-inventory.module';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule);
const employeeReviewModule = () => import('./employee-review-components/employee-review/employee-review.module').then(x => x.EmployeeReviewModule);
const inventoryModule = () => import('./inventory/inventory/inventory.module').then(x => x.InventoryModule);
const maintenanceModule = () => import('./maintenance/maintenance.module').then(x => x.MaintenanceModule);
const trailerInventoryModule = () => import('./trailer-Inventory/trailer-inventory.module').then(x => x.TrailerInventoryModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'employees', loadChildren: employeesModule, canActivate: [AuthGuard] },
    { path: 'inventory', loadChildren: inventoryModule },
    { path: 'maintenance', loadChildren: maintenanceModule },
    { path: 'trailer-inventory', loadChildren: trailerInventoryModule },
    { path: 'employee-review', loadChildren: employeeReviewModule },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
