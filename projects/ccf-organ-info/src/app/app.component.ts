import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AggregateResult } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { OrganLookupService } from './core/services/organ-lookup/organ-lookup.service';


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnChanges {
  @Input() organIri?: string;
  @Input() sex?: 'Both' | 'Male' | 'Female' = 'Female';
  @Input() side?: 'Left' | 'Right' = 'Left';

  readonly organInfo$: Observable<OrganInfo | undefined>;
  readonly stats$: Observable<AggregateResult[]>;
  readonly statsLabel$: Observable<string>;

  private readonly inputChangedTick$ = new ReplaySubject<void>(1);

  constructor(
    lookup: OrganLookupService,
    private readonly ga: GoogleAnalyticsService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.organInfo$ = this.inputChangedTick$.pipe(
      switchMap(() => lookup.getOrganInfo(
        this.organIri ?? '',
        this.side?.toLowerCase?.() as OrganInfo['side'],
        this.sex
      )),
      tap(info => this.logOrganLookup(info)),
      shareReplay(1)
    );

    this.stats$ = this.organInfo$.pipe(
      switchMap(info => info ? lookup.getOrganStats(
        info,
        this.sex
      ) : of([]))
    );

    this.statsLabel$ = this.stats$.pipe(
      withLatestFrom(this.organInfo$),
      map(([_stats, info]) => this.makeStatsLabel(info)),
      startWith('Loading...')
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleInputChanges(changes);
  }

  updateInput<K extends keyof this>(prop: K, value: this[K]): void {
    this[prop] = value;
    this.cdr.markForCheck();
  }

  private handleInputChanges(changes: SimpleChanges): void {
    const props = ['organIri', 'sex', 'side'];
    let hasChanges = false;

    for (const prop of props) {
      if (prop in changes) {
        this.logInputChange(prop, changes[prop].currentValue);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.inputChangedTick$.next();
    }
  }

  private makeStatsLabel(info: OrganInfo | undefined): string {
    let parts: (string | undefined)[] = [`Unknown IRI: ${this.organIri}`];
    if (info) {
      parts = [this.sex, info.organ, this.side?.toLowerCase?.()];
    }

    return parts.filter(seg => !!seg).join(', ');
  }

  private logInputChange(prop: string, value: unknown): void {
    const snakeCasedProp = prop.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    const event = `update_${snakeCasedProp}`;
    this.ga.event(event, 'organ', `${value}`);
  }

  private logOrganLookup(info: OrganInfo | undefined): void {
    const event = info ? 'organ_lookup_success' : 'organ_lookup_failure';
    const inputs = `Iri: ${this.organIri} - Sex: ${this.sex} - Side: ${this.side}`;
    this.ga.event(event, 'organ', inputs);
  }
}
