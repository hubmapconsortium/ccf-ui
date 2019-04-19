import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PopoverModule } from 'ngx-smart-popover';

import { SidenavComponent } from './sidenav.component';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    PopoverModule,
    ReactiveFormsModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
