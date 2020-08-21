import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { ExtractionSitesMenuComponent } from './extraction-sites-menu.component';


@NgModule({
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  declarations: [ExtractionSitesMenuComponent],
  exports: [ExtractionSitesMenuComponent]
})
export class ExtractionSitesMenuModule { }
