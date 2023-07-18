import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule, MatLegacyPrefix as MatPrefix, MatLegacySuffix as MatSuffix } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { DecoratedTextModule } from '../decorated-text/decorated-text.module';
import { TextSearchComponent } from './text-search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,

    DecoratedTextModule
  ],
  declarations: [TextSearchComponent],
  exports: [
    TextSearchComponent,

    // Reexport prefix/suffix markers
    MatPrefix,
    MatSuffix
  ]
})
export class TextSearchModule { }
