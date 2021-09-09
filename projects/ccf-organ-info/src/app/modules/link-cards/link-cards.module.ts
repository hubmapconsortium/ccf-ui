import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkCardsComponent } from './link-cards.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';



@NgModule({
  imports: [
    CommonModule,

    NgxGoogleAnalyticsModule,
  ],
  declarations: [LinkCardsComponent],
  exports: [LinkCardsComponent]
})
export class LinkCardsModule { }
