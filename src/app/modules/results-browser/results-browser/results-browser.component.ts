import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListResult, AggregateResult } from 'ccf-database';

@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss']
})
export class ResultsBrowserComponent {

  @Input() data: ListResult[];
  @Input() aggregateData: AggregateResult[];
  @Input() resultLabel: string;
  @Output() resultClicked = new EventEmitter<ListResult>();
}
