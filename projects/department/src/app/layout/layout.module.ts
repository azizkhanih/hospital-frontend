import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { DepartmentLayoutComponent } from './department/department-layout.component';

@NgModule({
  declarations: [
    DepartmentLayoutComponent,
    HeaderComponent
  ],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class LayoutModule { }
