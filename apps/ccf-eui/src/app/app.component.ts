import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { CCFDatabaseOptions, Filter, OntologyTreeModel } from 'ccf-database';
import { DataSourceService, GlobalConfigState, OrganInfo, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { BodyUiComponent } from '../../../ccf-shared/src/lib/components/body-ui/body-ui.component';
import { environment } from '../environments/environment';
import { OntologySelection } from './core/models/ontology-selection';
import { AppRootOverlayContainer } from './core/services/app-root-overlay/app-root-overlay.service';
import { ThemingService } from './core/services/theming/theming.service';
import { actionAsFn } from './core/store/action-as-fn';
import { DataStateSelectors } from './core/store/data/data.selectors';
import { DataQueryState, DataState } from './core/store/data/data.state';
import { ListResultsState } from './core/store/list-results/list-results.state';
import { SceneState } from './core/store/scene/scene.state';
import {
  RemoveSearch,
  SetSelectedSearches,
} from './core/store/spatial-search-filter/spatial-search-filter.actions';
import { SpatialSearchFilterSelectors } from './core/store/spatial-search-filter/spatial-search-filter.selectors';
import { SpatialSearchFilterItem } from './core/store/spatial-search-filter/spatial-search-filter.state';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';

interface AppOptions extends CCFDatabaseOptions {
  theme?: string;
  header?: boolean;
  homeUrl?: string;
  logoTooltip?: string;
  selectedOrgans?: string[];
  loginEnabled?: boolean;
  baseHref?: string;
}


/**
 * This is the main angular component that all the other components branch off from.
 * It is in charge of the header and drawer components who have many sub-components.
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('bodyUI', { static: false }) bodyUI: BodyUiComponent;


  @Select(DataStateSelectors.cellTypesTreeModel)
  readonly cellTypeTreeModel$: Observable<OntologyTreeModel>;

  @Select(DataStateSelectors.anatomicalStructuresTreeModel)
  readonly ontologyTreeModel$: Observable<OntologyTreeModel>;

  @Select(DataStateSelectors.biomarkersTreeModel)
  readonly biomarkersTreeModel$: Observable<OntologyTreeModel>;

  @Select(SpatialSearchFilterSelectors.items)
  readonly selectableSearches$: Observable<SpatialSearchFilterItem>;

  @Dispatch()
  readonly setSelectedSearches = actionAsFn(SetSelectedSearches);

  @Dispatch()
  readonly removeSpatialSearch = actionAsFn(RemoveSearch);

  menuOptions: string[] = ['AS', 'CT', 'B'];
  tooltips: string[] = ['Anatomical Structures', 'Cell Types', 'Biomarkers'];
  /**
   * Used to keep track of the ontology label to be passed down to the
   * results-browser component.
   */
  ontologySelectionLabel = 'body';

  cellTypeSelectionLabel = 'cell';

  biomarkerSelectionLabel = 'biomarker';

  selectionLabel = 'body | cell | biomarker';

  selectedtoggleOptions: string[] = [];

  /**
   * Whether or not organ carousel is open
   */
  organListVisible = true;

  /**
   * Emitted url object from the results browser item
   */
  url = '';

  /**
   * Acceptable viewer domains (others will open in new window)
   */
  acceptableViewerDomains: string[] = environment.acceptableViewerDomains || [];

  /**
   * Variable to keep track of whether the viewer is open
   * or not
   */
  viewerOpen = false;

  get isLightTheme(): boolean {
    return this.theming.getTheme().endsWith('light');
  }

  get isFirefox(): boolean {
    return navigator.userAgent.indexOf('Firefox') != -1;
  }

  /** Emits true whenever the overlay spinner should activate. */
  readonly spinnerActive$ = this.data.queryStatus$.pipe(
    map(state => state === DataQueryState.Running)
  );

  readonly loadingMessage$ = this.data.state$.pipe(map(x => x?.statusMessage));


  readonly ontologyTerms$: Observable<readonly string[]>;
  readonly cellTypeTerms$: Observable<readonly string[]>;
  readonly biomarkerTerms$: Observable<readonly string[]>;

  readonly theme$ = this.globalConfig.getOption('theme');
  readonly themeMode$ = new ReplaySubject<'light' | 'dark'>(1);

  readonly header$ = this.globalConfig.getOption('header');
  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');
  readonly logoTooltip$ = this.globalConfig.getOption('logoTooltip');
  readonly loginDisabled$ = this.globalConfig.getOption('loginDisabled');
  readonly filter$ = this.globalConfig.getOption('filter');
  readonly selectedOrgans$ = this.globalConfig.getOption('selectedOrgans');
  readonly baseHref$ = this.globalConfig.getOption('baseHref');

  /**
   * Creates an instance of app component.
   *
   * @param data The data state.
   */
  constructor(
    el: ElementRef<HTMLElement>,
    injector: Injector,
    readonly data: DataState,
    readonly theming: ThemingService,
    readonly scene: SceneState,
    readonly listResultsState: ListResultsState,
    readonly consentService: ConsentService,
    readonly snackbar: MatSnackBar,
    overlay: AppRootOverlayContainer,
    readonly dataSource: DataSourceService,
    private readonly globalConfig: GlobalConfigState<AppOptions>,
    cdr: ChangeDetectorRef
  ) {
    theming.initialize(el, injector);
    overlay.setRootElement(el);
    data.tissueBlockData$.subscribe();
    data.aggregateData$.subscribe();
    data.ontologyTermOccurencesData$.subscribe();
    data.cellTypeTermOccurencesData$.subscribe();
    data.biomarkerTermOccurencesData$.subscribe();
    data.sceneData$.subscribe();
    data.filter$.subscribe();
    data.technologyFilterData$.subscribe();
    data.providerFilterData$.subscribe();
    this.ontologyTerms$ = data.filter$.pipe(map(x => x?.ontologyTerms));
    this.cellTypeTerms$ = data.filter$.pipe(map(x => x?.cellTypeTerms));
    this.biomarkerTerms$ = data.filter$.pipe(map(x => x?.biomarkerTerms));
    this.filter$.subscribe((filter: Partial<Filter>)=> data.updateFilter(filter));
    this.baseHref$.subscribe(ref => this.globalConfig.patchState({ baseHref: ref ?? '' }));

    combineLatest([scene.referenceOrgans$, this.selectedOrgans$]).subscribe(
      ([refOrgans, selected]: [OrganInfo[], string[]]) => {
        scene.setSelectedReferenceOrgansWithDefaults(refOrgans, selected);
      });
    combineLatest([this.theme$, this.themeMode$]).subscribe(
      ([theme, mode]) => {
        this.theming.setTheme(`${theme}-theme-${mode}`);
        cdr.markForCheck();
      }
    );
    this.selectedtoggleOptions=this.menuOptions;
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        }
      },
      duration: this.consentService.consent === 'not-set' ? Infinity : 3000
    });

    if (window.matchMedia) {
      // Sets initial theme according to user theme preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeMode$.next('dark');
      } else {
        this.themeMode$.next('light');
      }

      // Listens for changes in user theme preference
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        this.themeMode$.next(e.matches ? 'dark' : 'light');
      });
    } else {
      this.themeMode$.next('light');
    }
  }

  /**
   * Resets the drawers and filter components to their default state.
   *
   * @param left The left drawer component gets passed in so we can call it's methods to control it's state
   * @param right The right drawer component gets passed in so we can call it's methods to control it's state
   * @param filterbox The filter's popover component gets passed in so we can control it's popover's state
   */
  reset(
    left: DrawerComponent,
    right: DrawerComponent,
    filterbox: FiltersPopoverComponent
  ): void {
    left.open();
    left.closeExpanded();
    right.open();
    right.closeExpanded();
    filterbox.removeBox();
    this.resetView();
  }

  resetView(): void {
    this.bodyUI.target = [0, 0, 0];
    this.bodyUI.rotation = 0;
    this.bodyUI.rotationX = 0;
    this.bodyUI.bounds = { x: 2.2, y: 2, z: 0.4 };
  }

  /**
   * Toggles scheme between light and dark mode
   */
  toggleScheme(): void {
    this.themeMode$.next(this.isLightTheme ? 'dark' : 'light');
  }

  /**
   * Captures changes in the ontologySelection and uses them to update the results-browser label
   * and the filter object in the data store.
   *
   * @param ontologySelection the list of currently selected organ nodes
   */
  ontologySelected(ontologySelection: OntologySelection[] | undefined, type: 'anatomical-structures' | 'cell-type' | 'biomarkers'): void {
    if (ontologySelection) {
      if (type === 'anatomical-structures') {
        this.data.updateFilter({ ontologyTerms: ontologySelection.map(selection => selection.id) });
        this.ontologySelectionLabel = this.createSelectionLabel(ontologySelection);
      } else if (type === 'cell-type') {
        this.data.updateFilter({ cellTypeTerms: ontologySelection.map(selection => selection.id) });
        this.cellTypeSelectionLabel = this.createSelectionLabel(ontologySelection);
      } else if (type === 'biomarkers') {
        this.data.updateFilter({ biomarkerTerms: ontologySelection.map(selection => selection.id) });
        this.biomarkerSelectionLabel = this.createSelectionLabel(ontologySelection);
      }

      this.selectionLabel = [
        this.ontologySelectionLabel || 'body',
        this.cellTypeSelectionLabel || 'cell',
        this.biomarkerSelectionLabel || 'biomarker'
      ].join(' | ');

      if (ontologySelection[0] && ontologySelection[0].label === 'body') {
        this.resetView();
      }
      return;
    }

    this.data.updateFilter({ ontologyTerms: [], cellTypeTerms: [], biomarkerTerms: [] });
    this.ontologySelectionLabel = '';
    this.cellTypeSelectionLabel = '';
  }

  /**
   * Creates selection label for the results-browser to display based on an
   * array of selected ontology nodes.
   */
  createSelectionLabel(ontologySelection: OntologySelection[]): string {
    if (ontologySelection.length === 0) {
      return '';
    }

    if (ontologySelection.length === 1) {
      return ontologySelection[0].label;
    }

    let selectionString = '';
    ontologySelection.forEach((selection, index) => {
      selectionString += selection.label;

      // Don't add a comma if it's the last item in the array.
      if (index < ontologySelection.length - 1) {
        selectionString += ', ';
      }
    });
    return selectionString;
  }

  /**
   * Opens the iframe viewer with an url
   *
   * @param url The url
   */
  openiFrameViewer(url: string): void {
    const isWhitelisted = this.acceptableViewerDomains.some(domain => url?.startsWith(domain));
    if (isWhitelisted) {
      this.url = url;
      this.viewerOpen = !!url;
    } else {
      // Open link in new tab
      window.open(url, '_blank');
      this.closeiFrameViewer();
    }
  }

  /**
   * Function to easily close the iFrame viewer.
   */
  closeiFrameViewer(): void {
    this.viewerOpen = false;
  }

  /**
   * Gets login token
   */
  get loggedIn(): boolean {
    const token = this.globalConfig.snapshot.hubmapToken ?? '';
    return token.length > 0;
  }

  isItemSelected(item: string) {
    return this.selectedtoggleOptions.includes(item);
  }

  toggleSelection(value) {
    this.selectedtoggleOptions = value;
  }
}
