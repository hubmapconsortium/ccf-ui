/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { filter, invoke, property } from 'lodash';

import { FlatNode } from '../../../core/models/flat-node';
import { OntologyNode } from '../../../core/models/ontology-node';
import { GetChildrenFunc } from '../../../core/services/ontology-search/ontology-search.service';

/**
 * Getter function for 'level' on a flat node.
 */
const getLevel = property<FlatNode, number>('level');

/**
 * Getter function for 'expandable' on a flat node.
 */
const isExpandable = property<FlatNode, boolean>('expandable');

/**
 * Represents a expandable tree of an ontology.
 */
@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologyTreeComponent implements OnInit, OnChanges {
  /**
   * Input of ontology filter, used for changing the ontology selections
   * from outside this component.
   */
  @Input() ontologyFilter: string[];

  /**
   * The node like objects to display in the tree.
   */
  // eslint-disable-next-line
  @Input()
  set nodes(nodes: OntologyNode[] | undefined) {
    this._nodes = nodes;
    if (this.control) {
      this.dataSource.data = this._nodes ?? [];
    }
  }

  get nodes(): OntologyNode[] | undefined { return this._nodes; }

  /**
   * Method for fetching the children of a node.
   */
  @Input()
  set getChildren(fun: GetChildrenFunc | undefined) {
    this._getChildren = fun;
    this.dataSource.data = this.nodes ?? [];
  }

  get getChildren(): GetChildrenFunc | undefined {
    return this._getChildren;
  }

  /**
   * Occurence Data is a record of terms that are in the current filter.
   */
  // eslint-disable-next-line
  @Input()
  set occurenceData(value: Record<string, number>) {
    if (value) {
      this._occurenceData = value;
    } else {
      this._occurenceData = {};
    }
  }

  get occurenceData(): Record<string, number> {
    return this._occurenceData;
  }

  /**
   * Storage for the getter / setter
   */
  private _occurenceData: Record<string, number>;

  /**
   * Term Data is a record of terms that the app currently has data for.
   */
  @Input()
  set termData(value: Record<string, number>) {
    if (value) {
      this._termData = value;
    } else {
      this._termData = {};
    }
  }

  get termData(): Record<string, number> {
    return this._termData;
  }

  /**
   * Storage for the getter / setter
   */
  private _termData: Record<string, number>;

  /**
   * Creates an instance of ontology tree component.
   *
   * @param cdr The change detector.
   */
  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Emits an event whenever a node has been selected.
   */
  @Output() nodeSelected = new EventEmitter<OntologyNode[]>();

  /**
   * Indentation of each level in the tree.
   */
  readonly indent: number | string = '1.5rem';

  /**
   * Tree controller.
   */
  readonly control = new FlatTreeControl<FlatNode>(getLevel, isExpandable);

  /**
   * Node flattener.
   */
  readonly flattener = new MatTreeFlattener(
    FlatNode.create, getLevel, isExpandable,
    // FIXME
    invoke.bind(undefined, this, 'getChildren') as GetChildrenFunc
  );

  /**
   * Data source of flat nodes.
   */
  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  /**
   * Storage for getter/setter 'nodes'.
   */
  private _nodes?: OntologyNode[] = undefined;

  /**
   * Storage for getter/setter 'getChildren'.
   */
  private _getChildren?: GetChildrenFunc;

  /**
   * A copy of the body node in order to manually select it when the component loads.
   */
  bodyNode = new FlatNode(
    {
      id: 'http://purl.obolibrary.org/obo/UBERON_0013702',
      label: 'body',
      parent: '',
      children: [
        'http://purl.obolibrary.org/obo/UBERON_0000948',
        'http://purl.obolibrary.org/obo/LMHA_00211',
        'http://purl.obolibrary.org/obo/UBERON_0002113',
        'http://purl.obolibrary.org/obo/UBERON_0002106',
        'http://purl.obolibrary.org/obo/UBERON_0001155',
        'http://purl.obolibrary.org/obo/UBERON_0002108',
        'http://purl.obolibrary.org/obo/UBERON_0001052'
      ],
      synonymLabels: []
    },
    0
  );

  /**
   * Keeping track of the first selection made allows us to ensure the 'body' node
   * is unselected as expected.
   */
  anySelectionsMade = false;

  /**
   * Currently selected nodes, defaulted to the body node for when the page initially loads.
   */
  selectedNodes: FlatNode[] = [];

  highlightedNode: OntologyNode | undefined;

  /**
   * Expand the body node when the component is initialized.
   */
  ngOnInit(): void {
    if (this.control.dataNodes) {
      this.control.expand(this.control.dataNodes[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes.ontologyFilter) {
      const ontologyFilter: string[] = changes.ontologyFilter.currentValue as string[];
      if (ontologyFilter?.length >= 0) {
        this.selectByIDs(ontologyFilter);
      } else {
        this.selectByIDs([this.bodyNode.original.id]);
      }
    }
  }

  selectByIDs(ids: string[]): void {
    const dataNodes = this.control.dataNodes;
    const selectedNodes: FlatNode[] = dataNodes.filter(node => ids.indexOf(node.original.id) > -1);

    if (selectedNodes?.length > 0) {
      this.selectedNodes = selectedNodes;
      this.control.collapseAll();
      this.selectedNodes.forEach(selectedNode => {
        this.expandAndSelect(selectedNode.original, (node) =>
          dataNodes.find(findNode => findNode.original.id === node.parent)?.original as OntologyNode, true
        );
      });
    }
  }

  /**
   * Expands the tree to show a node and sets the currect selection to that node.
   *
   * @param node The node to expand to and select.
   */
  expandAndSelect(node: OntologyNode, getParent: (n: OntologyNode) => OntologyNode, additive = false): void {
    const { cdr, control } = this;

    // Add all parents to a set
    const parents = new Set<OntologyNode>();
    let current = getParent(node);

    while (current) {
      parents.add(current);
      current = getParent(current);
    }

    // Find corresponding flat nodes
    const parentFlatNodes = filter(control.dataNodes, flat => parents.has(flat.original));
    const flatNode = control.dataNodes.find(flat => flat.original === node);

    // Expand nodes
    if (!additive) {
      this.selectedNodes = [];
      control.collapseAll();
    }

    for (const flat of parentFlatNodes) { control.expand(flat); }
    if (node.label === 'body' && control.dataNodes?.length > 0) {
      control.expand(control.dataNodes[0]);
    }

    // Select the node
    this.select(additive, flatNode, false, true);

    // Detect changes
    cdr.detectChanges();
  }

  /**
   * Determines whether a node can be expanded.
   *
   * @param node The node to test.
   * @returns True if the node has children.
   */
  isInnerNode(this: void, _index: number, node: FlatNode): boolean {
    return node.expandable;
  }

  /**
   * Determines whether a node is currently selected.
   * Only a single node can be selected at any time.
   *
   * @param node  The node to test.
   * @returns True if the node is the currently selected node.
   */
  isSelected(node: FlatNode | undefined): boolean {
    return this.selectedNodes.filter(selectedNode => node?.original.label === selectedNode?.original.label).length > 0;
  }

  /**
   * Handles selecting / deselecting nodes via updating the selectedNodes variable
   *
   * @param node The node to select.
   * @param ctrlKey Whether or not the selection was made with a ctrl + click event.
   */
  select(ctrlKey: boolean, node: FlatNode | undefined, emit: boolean, select: boolean): void {
    // This is to ensure the 'body' node is unselected regardless of what the first
    // selection is
    if (!this.anySelectionsMade) {
      this.selectedNodes = [];
      this.anySelectionsMade = true;
    }

    if (node === undefined) {
      this.selectedNodes = [];
      return;
    }

    // ctrl + click allows users to select multiple organs
    if (ctrlKey) {
      if (!select) {
        this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
      } else if (this.selectedNodes.indexOf(node) < 0) {
        this.selectedNodes.push(node);
      }
    } else {
      this.selectedNodes = [];
      if (select) {
        this.selectedNodes.push(node);
      }
    }

    if (emit) {
      this.nodeSelected.emit(this.selectedNodes.map(selectedNode => selectedNode?.original));
    }
  }

  mouseOver(node: OntologyNode): void {
    this.highlightedNode = node;
    console.log('mouseover', this.highlightedNode)
  }

  mouseOut(): void {
    this.highlightedNode = undefined;
  }

  updateOpacity(value: number | undefined): void {
    if (!this.highlightedNode) {
      return;
    }
    const updatedNode = {...this.highlightedNode, opacity: value};
    this.highlightedNode = updatedNode;
    console.log (this.highlightedNode)
  }

  resetNode(): void {
    if (this.highlightedNode) {
      const updatedNode = {...this.highlightedNode, opacity: 20, visible: true};
      this.highlightedNode = updatedNode;
    }
  }

  toggleVisibility(node: OntologyNode): void {
    node = node.visible ? {...node, opacity: 20, visible: false} : {...node, opacity: 20, visible: true};
    this.updateOpacity(node.opacity);
  }
}
