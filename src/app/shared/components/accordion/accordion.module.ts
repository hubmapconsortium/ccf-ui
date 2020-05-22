import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AccordionComponent } from './accordion.component';
import { ColorSchemePopupModule } from '../../../modules/color-scheme/color-scheme-popup/color-scheme-popup.module';
import { SchemeDropdownModule } from '../../../modules/scheme-dropdown/scheme-dropdown.module';


@NgModule({
  imports: [CommonModule, MatExpansionModule, ColorSchemePopupModule, SchemeDropdownModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent]
})

export class AccordionModule { }
