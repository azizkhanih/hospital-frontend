import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCardModule } from '../../components/department-card/department-card.module';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentComponent } from './department.component';

const BASE_MODULES = [CommonModule, RouterModule];
const CLIMEDO_MODULES = [SharedModule, DepartmentCardModule];
const COMPONENT = [DepartmentComponent];

const routes: Routes = [
    { path: '', component: DepartmentComponent },
    { path: ':departmentId', component: DepartmentComponent }
];

@NgModule({
    declarations: [...COMPONENT],
    imports: [
        RouterModule.forChild(routes),
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
    ],
})
export class DepartmentModule { }
