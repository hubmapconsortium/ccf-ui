import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyState, OntologyStateModel } from '../../../core/store/ontology/ontology.state';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';
import { OntologySelection } from '../../../core/models/ontology-selection';


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

  /**
   * A record of terms within the current filter.  To be passed on to ontology-tree
   */
  @Input() occurenceData: Record<string, number>;

  /**
   * A record of terms the app currently has data for.  To be passed on to ontology-tree
   */
  @Input() termData: Record<string, number>;

  /**
   * Input list of selected ontology terms passed down to ontology-tree.
   * Used to change display of ontology tree when selection is made from
   * outside the component.
   */
  @Input() ontologyFilter: string[];

  /**
   * Captures and passes along the change in ontologySelections.
   */
  @Output() ontologySelection = new EventEmitter<OntologySelection>();

  /**
   * Creates an instance of ontology selection component.
   * @param ontologySearchService Service for searching the ontology.
   * @param store The global state store.
   */
  constructor(
    public ontologySearchService: OntologySearchService,
    private readonly store: Store
  ) { }

  /**
   * Ontology selection event when node is selected from the search results.
   * @param ontologyNode selected ontology node.
   */
  selected(ontologyNode: OntologyNode): void {
    const { nodes } = this.store.selectSnapshot<OntologyStateModel>(OntologyState);
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }
}
