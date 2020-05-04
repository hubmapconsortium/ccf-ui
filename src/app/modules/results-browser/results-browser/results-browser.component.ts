import { Component, OnInit, Input } from '@angular/core';
import { ListResult, AggregateResult } from 'ccf-database';

@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss']
})
export class ResultsBrowserComponent implements OnInit {

  @Input() data: ListResult[];
  @Input() aggregateData: AggregateResult[];
  @Input() resultLabel: string;

  ngOnInit(): void {
    console.log('data: ', this.data);
  }

  clicked(): void {
    console.log('data: ', this.data);
  }

}
