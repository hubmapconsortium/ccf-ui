import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { BodyIconComponent } from './icons/body-icon/body-icon.component';
import { FeedbackIconComponent } from './icons/feedback-icon/feedback-icon.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { TissueIconComponent } from './icons/tissue-icon/tissue-icon.component';
import { LeftbarComponent } from './leftbar.component';


@NgModule({
  declarations: [LeftbarComponent, TissueIconComponent, BodyIconComponent, HomeIconComponent, FeedbackIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  exports: [LeftbarComponent]
})
export class LeftbarModule { }
