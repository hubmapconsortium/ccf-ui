import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild,
} from '@angular/core';
import { Debounce } from '@ngxs-labs/data/decorators';
import { SpatialSceneNode } from 'ccf-body-ui';
import { AggregateResult, CCFDatabaseOptions, SpatialEntity } from 'ccf-database';
import { OrganInfo, GlobalConfigState } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../environments/environment';

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

  // Configuration Options
  @Input() hubmapDataService: string;
  @Input() hubmapDataUrl: string;
  @Input() hubmapAssetUrl: string;
  @Input() hubmapToken: string;
  @Input()
  get hubmapDataSources(): string[] {
    return this._hubmapDataSources;
  }
  set hubmapDataSources(datasSources: string[] | string) {
    if (datasSources === '') {
      return;
    } else if (typeof datasSources === 'string') {
      this._hubmapDataSources = JSON.parse(datasSources);
    } else {
      this._hubmapDataSources = datasSources;
    }
  }

  @Input()
  get hubmapPortalUrl(): string {
    if (this._hubmapPortalUrl) {
      return this._hubmapPortalUrl;
    }
    return this.globalConfig.snapshot?.hubmapPortalUrl ?? '';
  }
  set hubmapPortalUrl(url: string) {
    this._hubmapPortalUrl = url;
  }

  readonly organInfo$: Observable<OrganInfo | undefined>;
  readonly organ$: Observable<SpatialEntity | undefined>;
  readonly scene$: Observable<SpatialSceneNode[]>;
  readonly stats$: Observable<AggregateResult[]>;
  readonly statsLabel$: Observable<string>;

  private _hubmapDataSources: string[];
  private _hubmapPortalUrl: string;


  private readonly inputChangedTick$ = new ReplaySubject<void>(1);

  constructor(
    lookup: OrganLookupService,
    private readonly ga: GoogleAnalyticsService,
    private readonly globalConfig: GlobalConfigState<CCFDatabaseOptions>
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

  @Debounce(20)
  updateGlobalConfig(): void {
    const { hubmapDataService, hubmapPortalUrl, hubmapDataUrl, hubmapAssetUrl, hubmapToken, hubmapDataSources } = this;
    const windowConfigKey = 'dbOptions';
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let config = { ...environment.dbOptions } as CCFDatabaseOptions;

    if (typeof globalThis[windowConfigKey] === 'object') {
      config = { ...config, ...globalThis[windowConfigKey] };
    }

    const inputs = {
      hubmapDataService,
      hubmapPortalUrl,
      hubmapDataUrl,
      hubmapAssetUrl,
      hubmapToken,
      hubmapDataSources
    };

    for (const key in inputs) {
      if (inputs[key] != null) {
        config[key] = inputs[key];
      }
    }

    this.globalConfig.patchConfig(config);
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

    if (
      'hubmapDataService' in changes ||
      'hubmapPortalUrl' in changes ||
      'hubmapDataUrl' in changes ||
      'hubmapAssetUrl' in changes ||
      'hubmapToken' in changes ||
      'hubmapDataSources' in changes
    ) {
      hasChanges = true;
      this.updateGlobalConfig();
    }

    if (hasChanges) {
      this.inputChangedTick$.next();
    }
  }

  private makeStatsLabel(info: OrganInfo | undefined): string {
    let parts: (string | undefined)[] = [`Unknown IRI: ${this.organIri}`];
    if (info) {
      parts = [this.sex, info.organ, info.side];
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
