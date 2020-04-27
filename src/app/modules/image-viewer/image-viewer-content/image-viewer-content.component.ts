import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccf-image-viewer-content',
  templateUrl: './image-viewer-content.component.html',
  styleUrls: ['./image-viewer-content.component.scss']
})
export class ImageViewerContentComponent {

  @Output() closeViewer = new EventEmitter();

  close() {
    this.closeViewer.emit();
  }
}
