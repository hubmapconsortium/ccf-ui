import { Component, Input } from '@angular/core';
import { ListResult } from 'ccf-database';

@Component({
  selector: 'ccf-results-browser-item',
  templateUrl: './results-browser-item.component.html',
  styleUrls: ['./results-browser-item.component.scss']
})
export class ResultsBrowserItemComponent {

  @Input() data: ListResult;

  downloadClicked(): void {
    console.log('clicked download');
  }
}
