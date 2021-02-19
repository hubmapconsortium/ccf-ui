import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPanelComponent } from './info-panel.component';
import { MarkdownModule } from 'ngx-markdown';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [InfoPanelComponent],
  imports: [CommonModule, MatExpansionModule, MarkdownModule.forRoot({
    sanitize: SecurityContext.NONE
  })],
  exports: [InfoPanelComponent]
})
export class InfoPanelModule {}
