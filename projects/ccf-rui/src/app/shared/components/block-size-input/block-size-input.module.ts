import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';


import { BlockSizeInputComponent } from './block-size-input.component';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule
  ],
  declarations: [BlockSizeInputComponent],
  exports: [BlockSizeInputComponent]
})
export class BlockSizeInputModule { }
