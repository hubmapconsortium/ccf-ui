import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ExtractionSitesMenuComponent } from './extraction-sites-menu.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ExtractionSitesMenuComponent],
  exports: [ExtractionSitesMenuComponent]
})
export class ExtractionSitesMenuModule { }
