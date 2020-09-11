import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ListComponent, ItemComponent],
  exports: [ListComponent],
})
export class TagListModule { }
