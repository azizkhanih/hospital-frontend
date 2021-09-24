import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentCardModule } from '../../components/department-card/department-card.module';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentComponent } from './department.component';

const BASE_MODULES = [CommonModule, RouterModule];
const CLIMEDO_MODULES = [SharedModule, DepartmentCardModule];
const COMPONENT = [DepartmentComponent];

@NgModule({
    declarations: [...COMPONENT],
    imports: [
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
    ],
    exports: [
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
        ...COMPONENT
    ],
})
export class DepartmentModule { }
