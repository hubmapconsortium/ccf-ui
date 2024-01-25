import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecoratedTextComponent } from './decorated-text.component';


@NgModule({
  imports: [CommonModule],
  declarations: [DecoratedTextComponent],
  exports: [DecoratedTextComponent]
})
export class DecoratedTextModule { }
