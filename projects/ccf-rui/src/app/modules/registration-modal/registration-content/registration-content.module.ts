import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RegistrationContentComponent } from './registration-content.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { NameInputModule } from '../../../shared/components/name-input/name-input.module';
import { LabeledSlideToggleModule } from '../../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';
import { OrganSelectorModule } from 'ccf-shared';


@NgModule({
  declarations: [RegistrationContentComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, NameInputModule, LabeledSlideToggleModule, OrganSelectorModule],
  exports: [RegistrationContentComponent]
})
export class RegistrationContentModule { }
