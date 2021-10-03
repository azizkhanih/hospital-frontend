import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';

const CLIMEDO_MODULES = [SharedModule, AccountRoutingModule];

@NgModule({
  declarations: [LoginComponent, CreateUserComponent],
  imports: [CommonModule, ReactiveFormsModule, ...CLIMEDO_MODULES],
})
export class AccountModule { }
