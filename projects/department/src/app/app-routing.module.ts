import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentLayoutComponent } from './layout/department/department-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentLayoutComponent,
    loadChildren: () => import('./pages/departments/departments.module').then((m) => m.DepartmentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
