import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastComponent } from './../../../../utilities/src/lib/toast/toast.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];
const NG_BOOTSTRAP_MODULES = [NgbModule, NgbToastModule, NgbModalModule];
const SHARED_COMPONENTS = [ConfirmModalComponent, ToastComponent];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ...BASE_MODULES,
    ...NG_BOOTSTRAP_MODULES,
    TranslateModule,
    NgxLoadingModule
  ],
  exports: [
    ...BASE_MODULES,
    ...NG_BOOTSTRAP_MODULES,
    TranslateModule,
    NgxLoadingModule,
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
