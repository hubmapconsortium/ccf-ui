import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockSizeInputComponent } from './block-size-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatInputModule, MatIconModule],
  declarations: [BlockSizeInputComponent],
  exports: [BlockSizeInputComponent]
})
export class BlockSizeInputModule { }
