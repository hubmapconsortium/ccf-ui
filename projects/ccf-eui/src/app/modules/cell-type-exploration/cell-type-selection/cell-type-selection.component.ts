import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { OntologyTreeModel, OntologyTreeNode } from 'ccf-database'; //TODO: replace with CellTypeTreeModel, CellTypeTreeNode

import { CellTypeSelection } from '../../../core/models/cell-type-selection';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service'; //TODO: replace with CellTypeSearchService
import { OntologyState } from '../../../core/store/ontology/ontology.state';  //TODO: replace with CellTypeState
import { CellTypeTreeComponent } from '../cell-type-tree/cell-type-tree.component';


/**
 * Cell type selection component that encapsulates cell type search and tree components.
 */
@Component({
  selector: 'ccf-cell-type-selection',
  templateUrl: './cell-type-selection.component.html',
  styleUrls: ['./cell-type-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellTypeSelectionComponent {
  /**
   * View child of search component
   */
  @ViewChild(CellTypeTreeComponent, { static: false }) tree: CellTypeTreeComponent;

  /**
   * A record of terms within the current filter.  To be passed on to cell-type-tree
   */
  @Input() occurenceData: Record<string, number>;

  /**
   * A record of terms the app currently has data for.  To be passed on to cell-type-tree
   */
  @Input() termData: Record<string, number>;

  /**
   * Input list of selected cell type terms passed down to cell-type-tree.
   * Used to change display of cell type tree when selection is made from
   * outside the component.
   */
  @Input() cellTypeFilter: string[];

  /**
   * Captures and passes along the change in CellTypeSelections.
   */
  @Output() readonly cellTypeSelection = new EventEmitter<CellTypeSelection>();

  /**
   * Creates an instance of cell type selection component.
   *
   * @param cellTypeSearchService Service for searching the cell type.
   * @param store The global state store.
   */
  constructor(
    public cellTypeSearchService: OntologySearchService,
    private readonly store: Store
  ) { }

  /**
   * Cell type selection event when node is selected from the search results.
   *
   * @param cellTypeNode selected cell type node.
   */
  selected(cellTypeNode: OntologyTreeNode): void {
    const { nodes } = this.store.selectSnapshot<OntologyTreeModel>(OntologyState);
    this.tree.expandAndSelect(cellTypeNode, node => nodes[node.parent]);
  }
}
