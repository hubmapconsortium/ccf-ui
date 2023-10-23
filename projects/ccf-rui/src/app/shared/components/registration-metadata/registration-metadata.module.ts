import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegistrationMetadataComponent } from './registration-metadata.component';
import { NameInputModule } from '../name-input/name-input.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { JsonFileReaderModule } from '../json-file-reader/json-file-reader.module';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NameInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    JsonFileReaderModule
  ],
  declarations: [RegistrationMetadataComponent],
  exports: [RegistrationMetadataComponent]
})
export class RegistrationMetadataModule { }
