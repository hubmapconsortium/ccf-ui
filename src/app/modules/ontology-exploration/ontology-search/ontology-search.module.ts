import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppStateModule } from 'src/app/app-state.module';

import { OntologySearchComponent } from './ontology-search.component';

@NgModule({
  declarations: [OntologySearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    AppStateModule
  ],
  exports: [OntologySearchComponent]
})
export class OntologySearchModule {}
