import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreDebugComponent } from './store-debug.component';


@NgModule({
  imports: [CommonModule],
  declarations: [StoreDebugComponent],
  exports: [StoreDebugComponent]
})
export class StoreDebugModule { }
