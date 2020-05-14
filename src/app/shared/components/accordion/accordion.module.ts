import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AccordionComponent } from './accordion.component';
import { SchemeDropdownModule } from '../../../modules/scheme-dropdown/scheme-dropdown.module';


@NgModule({
  imports: [CommonModule, MatExpansionModule, SchemeDropdownModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent]
})

export class AccordionModule { }
