import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationContent } from './registration-modal.component';

import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { LabeledSlideToggleModule } from '../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';


@NgModule({
  declarations: [RegistrationContent],
  imports: [CommonModule, NameInputModule, LabeledSlideToggleModule],
  exports: [RegistrationContent]
})
export class RegistrationContentModule { }
