import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataQueryState, DataState } from './core/store/data/data.state';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';
import { ImageViewerPopoverComponent } from './modules/image-viewer/image-viewer-popover/image-viewer-popover.component';

import { DataSourceService } from './core/services/data-source/data-source.service';
import { OntologySelection } from './core/models/ontology-selection';

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
   * Used to keep track of the ontology label to be passed down to the
   * results-browser component.
   */
  ontologySelectionLabel = 'body';

  /** Emits true whenever the overlay spinner should activate. */
  readonly spinnerActive$ = this.data.queryStatus$.pipe(
    map(state => state === DataQueryState.Running)
  );

  /**
   * Creates an instance of app component.
   *
   * @param data The data state.
   */
  constructor(readonly data: DataState, readonly dataSourceService: DataSourceService) {
    data.listData$.subscribe(console.log);
    data.aggregateData$.subscribe(console.log);
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
    filterbox: FiltersPopoverComponent,
    viewer: ImageViewerPopoverComponent
  ): void {
    viewer.close();
    left.open();
    left.closeExpanded();
    right.open();
    right.closeExpanded();
    filterbox.removeBox();
  }

  /**
   * Fetches relevant data from the database and calls the open function on the image viewer with the data
   * @param viewer The image viewer component
   * @param iri URL containing the image data
   */
  openViewer(viewer: ImageViewerPopoverComponent, iri: string): void {
    this.dataSourceService.getImageViewerData(iri).subscribe((data) => viewer.open(data));
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
}
