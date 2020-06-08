import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyState, OntologyStateModel } from '../../../core/store/ontology/ontology.state';
import { SearchState, SearchStateModel } from '../../../core/store/search/search.state';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';


/**
 * Ontology selection component that encapsulates ontology search and tree components.
 */
@Component({
  selector: 'ccf-ontology-selection',
  templateUrl: './ontology-selection.component.html',
  styleUrls: ['./ontology-selection.component.scss']
})
export class OntologySelectionComponent {
  /**
   * View child of search component
   */
  @ViewChild(OntologyTreeComponent, { static: false }) tree: OntologyTreeComponent;

  @Output() ontologySelection = new EventEmitter<string>();

  /**
   * Creates an instance of ontology selection component.
   * @param searchState State containing the currently active filters, etc.
   * @param ontologySearchService Service for searching the ontology.
   * @param store The global state store.
   */
  constructor(
    public searchState: SearchState,
    public ontologySearchService: OntologySearchService,
    private readonly store: Store
  ) {}

  /**
   * Ontology selection event when node is selected from the search results.
   * @param ontologyNode selected ontology node.
   */
  selected(ontologyNode: OntologyNode) {
    const { nodes } = this.store.selectSnapshot<OntologyStateModel>(OntologyState);
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }

  nodeSelected(event: SearchStateModel): void {
    this.searchState.setLocation(event);
    const id = event ? event.id : '';
    this.ontologySelection.emit(id);
  }
}
