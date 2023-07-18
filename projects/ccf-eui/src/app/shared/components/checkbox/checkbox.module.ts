import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

import { CheckboxComponent } from './checkbox.component';


@NgModule({
  imports: [CommonModule, MatCheckboxModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})
export class CheckboxModule { }
