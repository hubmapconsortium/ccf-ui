import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AccordionComponent } from './accordion.component';


@NgModule({
  imports: [CommonModule, MatExpansionModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent]
})

export class AccordionModule { }
