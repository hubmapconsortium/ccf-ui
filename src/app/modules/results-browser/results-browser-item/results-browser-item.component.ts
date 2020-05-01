import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-results-browser-item',
  templateUrl: './results-browser-item.component.html',
  styleUrls: ['./results-browser-item.component.scss']
})
export class ResultsBrowserItemComponent {

  @Input() lineOne: string;
  @Input() lineTwo: string;
  @Input() lineThree: string;
  @Input() lineFour: string;
  @Input() thumbnailURL: string;
  @Input() downloadURL: string;

  downloadClicked(): void {
    console.log('clicked download');
  }
}
