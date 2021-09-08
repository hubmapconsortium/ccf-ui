import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { DataSourceService } from './core/services/data-source/data-source.service';
import { AggregateResult, Filter } from 'ccf-database';


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @Input() organ? = 'Kidney';
  @Input() sex: 'Both' | 'Male' | 'Female' = 'Female';
  @Input() side?: 'left' | 'right' = 'right';
  @Input() organIri?: string = 'http://purl.obolibrary.org/obo/UBERON_0004539';

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
    this.organIri = this.organIri ? this.organIri : this.getCurrentOrgan()?.id;
    this.side = this.getCurrentOrgan()?.side;
    this.organ = this.getCurrentOrgan()?.organ;
  }

  sideChange(selection: 'left' | 'right'): void {
    this.side = selection === 'left' ? 'left' : 'right';
    this.organIri = ALL_ORGANS.find(organ => organ.organ === this.organ && organ.side === this.side)?.id;
  }

  getCurrentOrgan(): OrganInfo | undefined {
    if (this.organIri) {
      return ALL_ORGANS.find(organ => organ.id === this.organIri)
    } else {
      return ALL_ORGANS.find(organ => organ.organ === this.organ && (organ.side ? organ.side === this.side : true));
    }
  }
}
