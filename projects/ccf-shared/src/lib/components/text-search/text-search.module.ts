import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
