import { ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CCFDatabaseOptions } from 'ccf-database';
import { GlobalConfigState, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { BodyUiComponent } from '../../../ccf-shared/src/lib/components/body-ui/body-ui.component';
import { environment } from '../environments/environment';
import { OntologySelection } from './core/models/ontology-selection';
import { AppRootOverlayContainer } from './core/services/app-root-overlay/app-root-overlay.service';
import { DARK_THEME, LIGHT_THEME, ThemingService } from './core/services/theming/theming.service';
import { DataQueryState, DataState } from './core/store/data/data.state';
import { ListResultsState } from './core/store/list-results/list-results.state';
import { SceneState } from './core/store/scene/scene.state';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';


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

  /**
   * Used to keep track of the ontology label to be passed down to the
   * results-browser component.
   */
  ontologySelectionLabel = 'Body';

  cellTypeSelectionLabel = 'Body';

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

  /** Emits true whenever the overlay spinner should activate. */
  readonly spinnerActive$ = this.data.queryStatus$.pipe(
    map(state => state === DataQueryState.Running)
  );

  readonly ontologyTerms$: Observable<readonly string[]>;

  readonly cellTypeTerms$: Observable<readonly string[]>;

  readonly portalUrl$ = this.globalConfig.getOption('hubmapPortalUrl');

  /**
   * Creates an instance of app component.
   *
   * @param data The data state.
   */
  constructor(
    el: ElementRef<HTMLElement>, injector: Injector,
    readonly data: DataState, readonly theming: ThemingService,
    readonly scene: SceneState, readonly listResultsState: ListResultsState,
    readonly consentService: ConsentService, readonly snackbar: MatSnackBar, overlay: AppRootOverlayContainer,
    private readonly globalConfig: GlobalConfigState<CCFDatabaseOptions>
  ) {
    theming.initialize(el, injector);
    overlay.setRootElement(el);
    data.tissueBlockData$.subscribe();
    data.aggregateData$.subscribe();
    data.ontologyTermOccurencesData$.subscribe();
    data.cellTypeTermOccurencesData$.subscribe();
    data.sceneData$.subscribe();
    data.filter$.subscribe();
    data.technologyFilterData$.subscribe();
    data.providerFilterData$.subscribe();
    this.ontologyTerms$ = data.filter$.pipe(pluck('ontologyTerms'));
    this.cellTypeTerms$ = data.filter$.pipe(pluck('cellTypeTerms'));
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
        this.theming.setTheme(DARK_THEME);
      }

      // Listens for changes in user theme preference
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        this.theming.setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      });
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
    this.theming.setTheme(this.theming.getTheme() === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  }

  /**
   * Captures changes in the ontologySelection and uses them to update the results-browser label
   * and the filter object in the data store.
   *
   * @param ontologySelection the list of currently selected organ nodes
   */
  ontologySelected(ontologySelection: OntologySelection[] | undefined, type: 'ontology' | 'cell-type'): void {
    if (ontologySelection) {
      if (type === 'ontology') {
        this.data.updateFilter({ ontologyTerms: ontologySelection.map(selection => selection.id) });
      } else {
        this.data.updateFilter({ cellTypeTerms: ontologySelection.map(selection => selection.id) });
      }
      this.ontologySelectionLabel = this.createSelectionLabel(ontologySelection);
      if (ontologySelection[0] && ontologySelection[0].label === 'body') {
        this.resetView();
      }
      return;
    }

    this.data.updateFilter({ ontologyTerms: [], cellTypeTerms: [] });
    this.ontologySelectionLabel = '';
    this.cellTypeSelectionLabel = '';
  }

  /**
   * Creates selection label for the results-browser to display based on an
   * array of selected ontology nodes.
   */
  createSelectionLabel(ontolgySelection: OntologySelection[]): string {
    if (ontolgySelection.length === 0) {
      return '';
    }

    if (ontolgySelection.length === 1) {
      return ontolgySelection[0].label;
    }

    let selectionString = '';
    ontolgySelection.forEach((selection, index) => {
      selectionString += selection.label;

      // Don't add a comma if it's the last item in the array.
      if (index < ontolgySelection.length - 1) {
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
}
