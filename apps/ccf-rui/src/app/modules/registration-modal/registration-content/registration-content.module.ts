import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegistrationMetadataModule } from '../../../shared/components/registration-metadata/registration-metadata.module';
import { RegistrationContentComponent } from './registration-content.component';


@NgModule({
  declarations: [RegistrationContentComponent],
  imports: [CommonModule, MatTooltipModule, RegistrationMetadataModule, MatButtonModule],
  exports: [RegistrationContentComponent]
})
export class RegistrationContentModule { }
