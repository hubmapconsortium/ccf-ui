import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
