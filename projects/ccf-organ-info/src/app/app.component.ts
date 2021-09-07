import { Component } from '@angular/core';
import { AggregateResult } from 'ccf-database';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccf-organ-info';
  statsLabel = 'Male, kidney, left';
  stats: AggregateResult[] = [
    {
      count: 1,
      label: 'Tissue Sections'
    }
  ];
}
