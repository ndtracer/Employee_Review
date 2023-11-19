import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule);
const employeeReviewModule = () => import('./employee-review/employee-review.module').then(x => x.EmployeeReviewModule);
const inventoryModule = () => import('./inventory/inventory/inventory.module').then(x => x.InventoryModule);
const maintenanceModule = () => import('./maintenance/maintenance.module').then(x => x.MaintenanceModule);
const trailerInventoryModule = () => import('./trailer-Inventory/trailer-inventory.module').then(x => x.TrailerInventoryModule);
const settingsModule = () => import('./settings/settings.module').then(x => x.SettingsModule);
const locationsModule = () => import('./settings/locations/locations.module').then(x=>x.LocationsModule);
const departmentsModule = () => import('./settings/departments/departments.module').then(x=>x.DepartmentsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule, canActivate: [AuthGuard]  },
    { path: 'employees', loadChildren: employeesModule, canActivate: [AuthGuard] },
    { path: 'inventory', loadChildren: inventoryModule, canActivate: [AuthGuard]  },
    { path: 'maintenance', loadChildren: maintenanceModule, canActivate: [AuthGuard]  },
    { path: 'trailer-inventory', loadChildren: trailerInventoryModule, canActivate: [AuthGuard]  },
    { path: 'employee-review', loadChildren: employeeReviewModule, canActivate: [AuthGuard]  },
    { path: 'settings', loadChildren: settingsModule, canActivate: [AuthGuard]  },
    { path: 'locations', loadChildren: locationsModule, canActivate: [AuthGuard] },
    { path: 'departments', loadChildren: departmentsModule, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
