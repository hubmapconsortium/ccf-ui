import { Component } from '@angular/core';

@Component({
  selector: 'ccf-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss']
})
export class StatsListComponent {
  organInfo = 'male, kidney, left';
  stats = [
    {
      stat: 5,
      label: 'Tissue Data Providers'
    },
    {
      stat: 60,
      label: 'Donors'
    },
    {
      stat: 182,
      label: 'Tissue Blocks'
    }
  ];
}
