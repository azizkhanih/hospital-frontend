import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountLayoutComponent } from './account/account-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { DepartmentLayoutComponent } from './department/department-layout.component';

const CLIMEDO_MODULES = [SharedModule];

@NgModule({
  declarations: [
    DepartmentLayoutComponent,
    AccountLayoutComponent,
    HeaderComponent
  ],
  imports: [CommonModule, AppRoutingModule, ...CLIMEDO_MODULES],
})
export class LayoutModule { }
