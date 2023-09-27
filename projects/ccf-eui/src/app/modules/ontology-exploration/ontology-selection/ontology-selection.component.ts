import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { OntologyTreeModel, OntologyTreeNode } from 'ccf-database';

import { OntologySelection } from '../../../core/models/ontology-selection';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';


/**
 * Ontology selection component that encapsulates ontology search and tree components.
 */
@Component({
  selector: 'ccf-ontology-selection',
  templateUrl: './ontology-selection.component.html',
  styleUrls: ['./ontology-selection.component.scss'],
  providers: [OntologySearchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologySelectionComponent implements OnChanges {
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
   * The ontology tree model to display
   */
  @Input() treeModel: OntologyTreeModel;

  /**
   * Input list of selected ontology terms passed down to ontology-tree.
   * Used to change display of ontology tree when selection is made from
   * outside the component.
   */
  @Input() ontologyFilter: string[];

  @Input() header: boolean;
  @Input() placeholderText: string;

  @Input() showtoggle: boolean;

  /**
   * Captures and passes along the change in ontologySelections.
   */
  @Output() readonly ontologySelection = new EventEmitter<OntologySelection>();

  currentNodes: string[];

  menuOptions = ['gene', 'protein', 'lipid'];
  /**
   * Creates an instance of ontology selection component.
   *
   * @param ontologySearchService Service for searching the ontology.
   */
  constructor(
    public ontologySearchService: OntologySearchService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('treeModel' in changes && this.treeModel) {
      this.ontologySearchService.setTreeModel(this.treeModel);
    }
  }

  /**
   * Ontology selection event when node is selected from the search results.
   *
   * @param ontologyNode selected ontology node.
   */
  selected(ontologyNode: OntologyTreeNode): void {
    const nodes = this.treeModel?.nodes ?? {};
    this.tree.expandAndSelect(ontologyNode, node => nodes[node.parent]);
  }

  filterNodes(selectedTypes: string[]): void {
    const nodes = Object.values(this.treeModel.nodes);
    const filteredNodes = nodes.filter(node => selectedTypes.includes(node.nodeType ?? ''));
    this.currentNodes = filteredNodes.map(node => node.id);
  }

  getNodes(rootNode: OntologyTreeNode): OntologyTreeNode[] {
    const node = { ...rootNode };
    node.children = [...this.currentNodes];
    return [node];
  }

}
