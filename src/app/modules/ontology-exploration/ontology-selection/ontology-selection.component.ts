import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyState, OntologyStateModel } from '../../../core/store/ontology/ontology.state';
import { SearchState } from '../../../core/store/search/search.state';
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

  constructor(
    public searchState: SearchState,
    public ontologySearchService: OntologySearchService,
    public ontologyState: OntologyState,
    public store: Store
  ) {}

  /**
   * Ontology selection event when node is selected from the search results.
   * @param ontologyNode selected ontology node.
   */
  selected(ontologyNode: OntologyNode) {
    const { nodes } = this.store.selectSnapshot<OntologyStateModel>(OntologyState);
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }
}
