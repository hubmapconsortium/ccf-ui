import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataComponent } from './metadata.component';

@NgModule({
  declarations: [MetadataComponent],
  imports: [
    CommonModule
  ],
  exports: [MetadataComponent]
})
export class MetadataModule { }
