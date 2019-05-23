import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { OntologyNode } from 'src/app/shared/state/ontology/ontology.model';
import { OntologyState } from 'src/app/shared/state/ontology/ontology.state';

import { OntologyService } from '../../shared/services/ontology/ontology.service';
import { SearchService } from '../../shared/services/search/search.service';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';

/**
 * Container component for search filters.
 */
@Component({
  selector: 'ccf-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /**
   * View child of search component
   */
  @ViewChild(OntologyTreeComponent) tree: OntologyTreeComponent;
  /**
  * Available search filter categories and their values, TODO - needs to be fetched from the data
  * based on the implementation
  */
  filterCategories = new Map([
    ['Technologies', ['IMS', 'MxIF', 'AF', 'PAS', 'IHC']],
    ['TMCs', ['TMC-Vanderbilt', 'TMC-UCSD', 'TMC-Stanford', 'TMC-Florida', 'TMC-CalTech']]
  ]);

  /**
   * Creates an instance of search component.
   *
   * @param ontology The service used to interact with the ontology.
   * @param search Service used to update the search state.
   * @param store The global state.
   */
  constructor(
    readonly ontology: OntologyService,
    readonly search: SearchService,
    private store: Store
  ) { }

  /**
   * Expands and selects the ontology node in the tree
   * @param ontologyNode the selected ontology node
   */
  selected(ontologyNode: OntologyNode) {
    const { nodes } = this.store.selectSnapshot(OntologyState);
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }
}
