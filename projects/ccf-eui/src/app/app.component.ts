import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { OntologySelection } from './core/models/ontology-selection';
import { DataSourceService } from './core/services/data-source/data-source.service';
import { ThemingService } from './core/services/theming/theming.service';
import { DataQueryState, DataState } from './core/store/data/data.state';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';
import { ALL_ORGANS } from 'ccf-shared';
import { OrganInfo } from 'ccf-shared'

/**
 * This is the main angular component that all the other components branch off from.
 * It is in charge of the header and drawer components who have many sub-components.
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * List of organs to be displayed in the carousel
   */
  organList = ALL_ORGANS;

  /**
   * Organs to be selected in the organ selector carousel
   */
  selectedOrgans = this.organList.filter(organ => organ.name !== 'Large Intestine');

  /**
   * Used to keep track of the ontology label to be passed down to the
   * results-browser component.
   */
  ontologySelectionLabel = 'body';

  /**
   * Whether or not organ carousel is open
   */
  open = true;

  /** Emits true whenever the overlay spinner should activate. */
  readonly spinnerActive$ = this.data.queryStatus$.pipe(
    map(state => state === DataQueryState.Running)
  );

  readonly ontologyTerms$: Observable<readonly string[]>;

  /**
   * Creates an instance of app component.
   *
   * @param data The data state.
   */
  constructor(readonly data: DataState, readonly dataSourceService: DataSourceService, readonly theming: ThemingService) {
    data.listData$.subscribe();
    data.aggregateData$.subscribe();
    data.termOccurencesData$.subscribe();
    this.ontologyTerms$ = data.filter$.pipe(pluck('ontologyTerms'));
  }

  /**
   * Resets the drawers and filter components to their default state.
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
  }

  /**
   * Toggles scheme between light and dark mode
   */
  toggleScheme(): void {
    this.theming.setTheme(this.theming.getTheme() === 'light-theme' ? 'dark-theme' : 'light-theme');
  }

  /**
   * Captures changes in the ontologySelection and uses them to update the results-browser label
   * and the filter object in the data store.
   * @param ontologySelection the list of currently selected organ nodes
   */
  ontologySelected(ontologySelection: OntologySelection[]): void {
    if (!!ontologySelection) {
      this.data.updateFilter({ ontologyTerms: ontologySelection.map(selection => selection.id)});
      this.ontologySelectionLabel = this.createSelectionLabel(ontologySelection);
      return;
    }

    this.data.updateFilter({ ontologyTerms: [] });
    this.ontologySelectionLabel = '';
  }

  /**
   * Creates selection label for the results-browser to display based on an
   * array of selected ontology nodes.
   */
  createSelectionLabel(ontolgySelection: OntologySelection[]): string{
    if (ontolgySelection.length === 0){
      return '';
    }

    if (ontolgySelection.length === 1){
      return ontolgySelection[0].label;
    }

    let selectionString = '';
    ontolgySelection.forEach((selection, index) => {
      selectionString += selection.label;

      // Don't add a comma if it's the last item in the array.
      if (index < ontolgySelection.length - 1){
        selectionString += ', ';
      }
    });
    return selectionString;
  }

  get hubmapPortalUrl(): string {
    return this.dataSourceService.dbOptions.hubmapPortalUrl;
  }

  get loggedIn(): boolean {
    const token = this.dataSourceService.dbOptions.hubmapToken || '';
    return token.length > 0;
  }

  changeOrgans(organs: OrganInfo[]): void {
    this.selectedOrgans = organs;
  }
}
