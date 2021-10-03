import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './layout/account/account-layout.component';
import { DepartmentLayoutComponent } from './layout/department/department-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentLayoutComponent,
    loadChildren: () => import('./pages/departments/departments.module').then((m) => m.DepartmentsModule),
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'department',
    component: DepartmentLayoutComponent,
    loadChildren: () => import('./pages/department/department.module').then((m) => m.DepartmentModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
