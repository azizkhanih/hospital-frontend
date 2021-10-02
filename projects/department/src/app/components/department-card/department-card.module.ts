import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentCardComponent } from './department-card.component';

const BASE_MODULES = [CommonModule, RouterModule];
const CLIMEDO_MODULES = [SharedModule];
const COMPONENTS = [DepartmentCardComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
    ],
    exports: [
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
        ...COMPONENTS
    ],
})
export class DepartmentCardModule { }
