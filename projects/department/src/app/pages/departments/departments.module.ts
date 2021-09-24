import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const BASE_MODULES = [CommonModule, RouterModule];
const MATERIAL_MODULES: [] = [];
const CLIMEDO_MATERIAL_MODULES = [SharedModule];
const COMPONENT: [] = [];
const FOOD_AND_BEVERAGE_MODULES: [] = [];

@NgModule({
    declarations: [...COMPONENT],
    imports: [
        ...BASE_MODULES,
        ...MATERIAL_MODULES,
        ...CLIMEDO_MATERIAL_MODULES,
        ...FOOD_AND_BEVERAGE_MODULES,
    ],
    exports: [
        ...BASE_MODULES,
        ...MATERIAL_MODULES,
        ...CLIMEDO_MATERIAL_MODULES,
        ...FOOD_AND_BEVERAGE_MODULES,
        ...COMPONENT
    ],
})
export class DepartmentsModule { }
