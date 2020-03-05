import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchState } from 'src/app/shared/state/search/search.state';
import { OntologySearchService } from 'src/app/shared/services/ontology-search/ontology-search.service';
import { OntologyState } from 'src/app/shared/state/ontology/ontology.state';
import { OntologyNode } from 'src/app/shared/models/ontology-node.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';

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

  selected(ontologyNode: OntologyNode) {
    const { nodes } = this.store.selectSnapshot(OntologyState);
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }

}
