import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TagListItemComponent } from './item/item.component';
import { TagListComponent } from './list/list.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [TagListComponent, TagListItemComponent],
  exports: [TagListComponent],
})
export class TagListModule { }
