import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderComponent } from './header.component';

const BASE_MODULES = [CommonModule, RouterModule];
const CLIMEDO_MODULES = [SharedModule];
const COMPONENTS = [HeaderComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        ...BASE_MODULES,
        ...CLIMEDO_MODULES,
    ],
})
export class HeaderModule { }
