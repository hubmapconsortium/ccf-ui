import { Observable } from 'rxjs';
import { DataSourceService } from './core/services/data-source/data-source.service';
import { AggregateResult, Filter } from 'ccf-database';
import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ccf-organ-info';
  statsLabel = 'Male, kidney, left';
  stats: Observable<AggregateResult[]>;

  testFilter: Filter = {
    sex: 'Both',
    ageRange: [
      1,
      110
    ],
    bmiRange: [
      13,
      83
    ],
    tmc: [],
    technologies: [],
    ontologyTerms: [
      'http://purl.obolibrary.org/obo/UBERON_0000948'
    ]
  };

  constructor(readonly data: DataSourceService) {
    this.stats = data.getAggregateResults(this.testFilter);
  }
}
