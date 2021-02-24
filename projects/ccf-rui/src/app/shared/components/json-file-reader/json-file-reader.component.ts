import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ccf-json-file-reader',
  templateUrl: './json-file-reader.component.html',
  styleUrls: ['./json-file-reader.component.scss']
})
export class JsonFileReaderComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-json-file-reader';
  /** File Input element, used to manually trigger the click event. */
  @ViewChild('fileInput') fileInput: ElementRef<HTMLElement>;

  /** Allows the label on the upload button to be customized. */
  @Input() label = 'Upload';

  /** Emits the json object of any files uploaded. */
  @Output() parsedJson = new EventEmitter<unknown>();

  /**
   * Method used to trigger the file input element's click handler
   * from the placeholder button used for styling purposes.
   */
  triggerFileInput(): void {
    const fileInputElement: HTMLElement = this.fileInput.nativeElement;
    fileInputElement.click();
  }

  /**
   * Takes in a json file and emits the parsed json object.
   * @param event file input event
   */
  handleFile(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files![0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const json = JSON.parse(fileReader.result as string) as unknown;
      this.parsedJson.emit(json);
    };
    fileReader.readAsText(file);
  }
}
