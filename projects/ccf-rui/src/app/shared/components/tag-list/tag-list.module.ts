import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';

import { TagListComponent } from './tag-list.component';


@NgModule({
  imports: [
    CommonModule,

    MatChipsModule,
    MatIconModule
  ],
  declarations: [TagListComponent],
  exports: [TagListComponent],
})
export class TagListModule { }
