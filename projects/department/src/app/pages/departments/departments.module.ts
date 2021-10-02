import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCardModule } from '../../components/department-card/department-card.module';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentsComponent } from './departments.component';

const BASE_MODULES = [CommonModule, RouterModule];
const CLIMEDO_MODULES = [SharedModule, DepartmentCardModule];
const COMPONENTS = [DepartmentsComponent];

const routes: Routes = [
    {
        path: '',
        component: DepartmentsComponent
    }
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        RouterModule.forChild(routes),
        ...BASE_MODULES,
        ...CLIMEDO_MODULES
    ]
})
export class DepartmentsModule { }
