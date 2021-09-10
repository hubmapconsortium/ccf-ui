import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { AggregateResult, Filter } from 'ccf-database';
import { ALL_ORGANS } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, of } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { DataSourceService } from './core/services/data-source/data-source.service';



@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnChanges {
  @Input()
  get organIri(): string {
    return this._organIri;
  }
  set organIri(value: string) {
    this._organIri = value;
    this.ga?.event('update_iri', 'organ', value);
    this.cdr.markForCheck();
  }

  @Input() sex: 'Male' | 'Female' = 'Female';
  @Input() side?: 'Left' | 'Right' = 'Left';

  statsLabel = 'Loading...';
  stats$: Observable<AggregateResult[]>;

  private _organIri: string;
  private readonly referenceOrgans$ = this.source.getReferenceOrgans().pipe(shareReplay(1));

  constructor(readonly source: DataSourceService, private readonly ga: GoogleAnalyticsService, private readonly cdr: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.referenceOrgans$.pipe(take(1)).subscribe((_referenceOrgans) => {
      let organ = ALL_ORGANS.find(o => o.id === this.organIri);
      if (organ) {
        if (organ.side && organ.side !== this.side?.toLowerCase()) {
          const otherSideOrgan = ALL_ORGANS.find(o => o.organ === organ?.organ && o.side === this.side?.toLowerCase());
          if (otherSideOrgan) {
            organ = otherSideOrgan;
            this._organIri = otherSideOrgan.id as string;
            this.ga.event('update_iri', 'organ', this.organIri);
          }
        }
        this.statsLabel = [this.sex, organ.organ, this.side].filter(n => !!n).join(', ');
        this.stats$ = this.source.getAggregateResults(
          { sex: this.sex, ontologyTerms: [ organ.id ] } as Filter
        );
      } else {
        this.statsLabel = `Unknown IRI: ${this.organIri}`;
        this.stats$ = of([]);
        this.ga.exception(this.statsLabel, false);
      }
      this.cdr.markForCheck();
    });
  }

  updateSex(sex: 'Male' | 'Female'): void {
    this.sex = sex;
    this.ga.event('update_sex', 'organ', sex.toLowerCase());
    this.ngOnChanges();
  }

  updateSide(side: 'Left' | 'Right'): void {
    this.side = side;
    this.ga.event('update_side', 'organ', side.toLowerCase());
    this.ngOnChanges();
  }
}
