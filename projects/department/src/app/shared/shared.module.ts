import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];
const NG_BOOTSTRAP_MODULES = [NgbModule, NgbToastModule, NgbModalModule];
const SHARED_COMPONENTS = [ConfirmModalComponent];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ...BASE_MODULES,
    ...NG_BOOTSTRAP_MODULES,
    TranslateModule
  ],
  exports: [
    ...BASE_MODULES,
    ...NG_BOOTSTRAP_MODULES,
    TranslateModule,
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
