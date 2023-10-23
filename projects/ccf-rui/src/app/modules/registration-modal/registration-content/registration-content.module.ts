import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegistrationMetadataModule } from '../../../shared/components/registration-metadata/registration-metadata.module';
import { RegistrationContentComponent } from './registration-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [RegistrationContentComponent],
  imports: [CommonModule, MatTooltipModule, RegistrationMetadataModule],
  exports: [RegistrationContentComponent]
})
export class RegistrationContentModule { }
