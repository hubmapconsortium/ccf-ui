import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AggregateResult } from 'ccf-database';

@Component({
  selector: 'ccf-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsListComponent {
  @Input() statsLabel!: string;
  @Input() stats!: AggregateResult[];
}
