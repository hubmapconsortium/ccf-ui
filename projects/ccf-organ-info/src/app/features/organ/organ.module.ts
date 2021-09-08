import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganComponent } from './organ.component';

import { BodyUiModule } from 'ccf-shared';
import { SlideToggleModule } from '../slide-toggle/slide-toggle/slide-toggle.module';


@NgModule({
  declarations: [
    OrganComponent
  ],
  imports: [
    CommonModule,
    BodyUiModule,
    SlideToggleModule
  ],
  exports: [
    OrganComponent
  ]
})
export class OrganModule { }
