import { Immutable } from '@angular-ru/common/typings';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { AggregateResult, SpatialEntity, TissueBlockResult } from 'ccf-database';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, of } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { OrganLookupService } from './core/services/organ-lookup/organ-lookup.service';


interface GlobalConfig {
  organIri?: string;
  side?: string;
  sex?: 'Both' | 'Male' | 'Female';
  highlightProviders?: string[];
}

const EMPTY_SCENE = [
  { color: [0, 0, 0, 0], opacity: 0.001 }
];


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('left', { read: ElementRef, static: true }) left: ElementRef<HTMLElement>;
  @ViewChild('right', { read: ElementRef, static: true }) right: ElementRef<HTMLElement>;

  readonly sex$ = this.configState.getOption('sex');
  readonly side$ = this.configState.getOption('side');
  readonly filter$ = this.configState.getOption('highlightProviders')
    .pipe(map((providers: string[]) => ({ tmc: providers })));
  readonly organInfo$: Observable<OrganInfo | undefined>;
  readonly organ$: Observable<SpatialEntity | undefined>;
  readonly scene$: Observable<SpatialSceneNode[]>;
  readonly stats$: Observable<AggregateResult[]>;
  readonly statsLabel$: Observable<string>;
  readonly blocks$: Observable<TissueBlockResult[]>;

  private latestConfig: Immutable<GlobalConfig> = {};
  private latestOrganInfo?: OrganInfo;

  constructor(
    lookup: OrganLookupService,
    private readonly ga: GoogleAnalyticsService,
    private readonly configState: GlobalConfigState<GlobalConfig>
  ) {
    this.organInfo$ = configState.config$.pipe(
      tap(config => (this.latestConfig = config)),
      switchMap(config => lookup.getOrganInfo(
        config.organIri ?? '',
        config.side?.toLowerCase?.() as OrganInfo['side'],
        config.sex
      )),
      tap(info => this.logOrganLookup(info)),
      tap(info => (this.latestOrganInfo = info)),
      shareReplay(1)
    );

    this.organ$ = this.organInfo$.pipe(
      switchMap(info => info ? lookup.getOrgan(
        info,
        info.hasSex ? this.latestConfig.sex : undefined
      ) : of(undefined)),
      tap(organ => {
        if (organ && this.latestOrganInfo) {
          const newSex = this.latestOrganInfo?.hasSex ? organ.sex : undefined;
          if (newSex !== this.latestConfig.sex) {
            this.updateInput('sex', newSex);
          }
          if (organ.side !== this.latestConfig.side) {
            this.updateInput('side', organ.side);
          }
        }
      }),
      shareReplay(1)
    );

    this.scene$ = this.organ$.pipe(
      switchMap((organ) => organ && this.latestOrganInfo ? lookup.getOrganScene(
        this.latestOrganInfo,
        organ.sex
      ) : of(EMPTY_SCENE as SpatialSceneNode[]))
    );

    this.stats$ = this.organ$.pipe(
      switchMap(organ => organ && this.latestOrganInfo ? lookup.getOrganStats(
        this.latestOrganInfo,
        organ.sex
      ) : of([]))
    );

    this.statsLabel$ = this.stats$.pipe(
      withLatestFrom(this.organInfo$),
      map(([_stats, info]) => this.makeStatsLabel(info)),
      startWith('Loading...')
    );

    this.blocks$ = this.organ$.pipe(
      switchMap(organ => organ && this.latestOrganInfo ? lookup.getBlocks(
        this.latestOrganInfo,
        organ.sex
      ) : of([]))
    );
  }

  ngAfterViewInit(): void {
    const { left, right } = this;
    const rightHeight = right.nativeElement.offsetHeight;
    left.nativeElement.style.height = `${rightHeight}px`;
  }

  updateInput(key: string, value: unknown): void {
    this.configState.patchConfig({ [key]: value });
  }

  private makeStatsLabel(info: OrganInfo | undefined): string {
    let parts: (string | undefined)[] = [`Unknown IRI: ${this.latestConfig.organIri}`];
    if (info) {
      parts = [this.latestConfig.sex, info.organ, info.side];
    }

    return parts.filter(seg => !!seg).join(', ');
  }

  private logOrganLookup(info: OrganInfo | undefined): void {
    const event = info ? 'organ_lookup_success' : 'organ_lookup_failure';
    const inputs = `Iri: ${this.latestConfig.organIri} - Sex: ${this.latestConfig.sex} - Side: ${this.latestConfig.side}`;
    this.ga.event(event, 'organ', inputs);
  }
}
