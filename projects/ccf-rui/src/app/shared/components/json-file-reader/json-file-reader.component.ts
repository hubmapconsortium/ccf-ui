import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ccf-json-file-reader',
  templateUrl: './json-file-reader.component.html',
  styleUrls: ['./json-file-reader.component.scss']
})
export class JsonFileReaderComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-json-file-reader';
  @ViewChild('fileInput') fileInput: ElementRef<HTMLElement>;

  @Input() label: string = 'Upload';
  @Output() parsedJson = new EventEmitter<Object>();

  triggerFileInput(): void {
    let fileInputElement: HTMLElement = this.fileInput.nativeElement;
    fileInputElement.click();
  }

  handleFile(event): void {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      const json = JSON.parse(fileReader.result as string);
      this.parsedJson.emit(json);
    }
    fileReader.readAsText(file);
  }
}
