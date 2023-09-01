import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFileReaderComponent } from './json-file-reader.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [JsonFileReaderComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [JsonFileReaderComponent]
})
export class JsonFileReaderModule { }
