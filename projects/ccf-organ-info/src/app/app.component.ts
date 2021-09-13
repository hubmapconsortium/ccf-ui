import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild,
} from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { AggregateResult, SpatialEntity } from 'ccf-database';
import { OrganInfo } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { OrganLookupService } from './core/services/organ-lookup/organ-lookup.service';


const EMPTY_SCENE = [
  { color: [0, 0, 0, 0], opacity: 0.001 }
];


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnChanges, AfterViewInit {
  @Input() organIri?: string;
  @Input() sex?: 'Both' | 'Male' | 'Female' = 'Female';
  @Input() side?: 'Left' | 'Right' = 'Left';

  @ViewChild('left', { read: ElementRef, static: true }) left: ElementRef<HTMLElement>;
  @ViewChild('right', { read: ElementRef, static: true }) right: ElementRef<HTMLElement>;

  readonly organInfo$: Observable<OrganInfo | undefined>;
  readonly organ$: Observable<SpatialEntity | undefined>;
  readonly scene$: Observable<SpatialSceneNode[]>;
  readonly stats$: Observable<AggregateResult[]>;
  readonly statsLabel$: Observable<string>;

  private readonly inputChangedTick$ = new ReplaySubject<void>(1);

  constructor(
    lookup: OrganLookupService,
    private readonly ga: GoogleAnalyticsService
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

    this.organ$ = this.organInfo$.pipe(
      switchMap(info => info ? lookup.getOrgan(
        info,
        this.sex
      ) : of(undefined)),
      shareReplay(1)
    );

    this.scene$ = this.organ$.pipe(
      withLatestFrom(this.organInfo$),
      switchMap(([organ, info]) => organ && info ? lookup.getOrganScene(
        info,
        this.sex
      ) : of(EMPTY_SCENE as SpatialSceneNode[]))
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

  ngAfterViewInit(): void {
    const { left, right } = this;
    const rightHeight = right.nativeElement.offsetHeight;
    left.nativeElement.style.height = `${rightHeight}px`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleInputChanges(changes);
  }

  updateInput<K extends keyof this>(prop: K, value: this[K]): void {
    const changes: SimpleChanges = { [prop]: new SimpleChange(this[prop], value, false) };

    this[prop] = value;
    this.handleInputChanges(changes);
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
