import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { filter, isArray, property } from 'lodash';
import { Observable } from 'rxjs';

import { FlatNode, NodeLike } from './shared/flat-node';

/**
 * Getter function for 'level' on a flat node.
 */
const getLevel = property<FlatNode<any>, number>('level');

/**
 * Getter function for 'expandable' on a flat node.
 */
const isExpandable = property<FlatNode<any>, boolean>('expandable');

/**
 * Getter function for 'children' on a node like object.
 */
const getChildren = property<NodeLike<any>, Observable<any[]> | any[]>('children');

@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologyTreeComponent<T extends NodeLike<T>> {
  /**
   * The node like objects to display in the tree.
   */
  @Input()
  set nodes(nodes: T | T[]) {
    this.dataSource.data = isArray(nodes) ? nodes : [nodes];
  }

  /**
   * Emits an event whenever a node has been selected.
   */
  @Output() nodeSelected = new EventEmitter<T>();

  /**
   * Emits an event whenever a node is deselected.
   */
  @Output() nodeDeselected = new EventEmitter<T>();

  /**
   * Indentation of each level in the tree.
   */
  readonly indent: number | string = '1.5rem';

  /**
   * Tree controller.
   */
  readonly control = new FlatTreeControl<FlatNode<T>>(getLevel, isExpandable);

  /**
   * Node flattener.
   */
  readonly flattener = new MatTreeFlattener<T, FlatNode<T>>(FlatNode.create, getLevel, isExpandable, getChildren);

  /**
   * Data source of flat nodes.
   */
  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  /**
   * Currently selected node.
   */
  private selectedNode?: FlatNode<T> = undefined;

  /**
   * Creates an instance of ontology tree component.
   *
   * @param cdr The change detector.
   */
  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Expands the tree to show a node and sets the currect selection to that node.
   *
   * @param node The node to expand to and select.
   */
  expandAndSelect(node: T): void {
    const { cdr, control } = this;

    // Add all parents to a set
    const parents = new Set<T>();
    let current = node.parent;
    while (current) {
      parents.add(current);
      current = current.parent;
    }

    // Find corresponding flat nodes
    const parentFlatNodes = filter(control.dataNodes, flat => parents.has(flat.original));
    const flatNode = control.dataNodes.find(flat => flat.original === node);

    // Expand nodes
    control.collapseAll();
    for (const flat of parentFlatNodes) { control.expand(flat); }

    // Select the node
    this.select(flatNode);

    // Detect changes
    cdr.detectChanges();
  }

  // Internal
  /**
   * Determines whether a node can be expanded.
   *
   * @param node The node to test.
   * @returns True if the node has children.
   */
  isInnerNode(_index: number, node: FlatNode<T>): boolean {
    return node.expandable;
  }

  /**
   * Determines whether a node is currently selected.
   * Only a single node can be selected at any time.
   *
   * @param node  The node to test.
   * @returns True if the node is the currently selected node.
   */
  isSelected(node: FlatNode<T>): boolean {
    return node === this.selectedNode;
  }

  /**
   * Sets a node to be the currently selected node.
   * Deselects the previously selected node.
   *
   * @param node The node to select.
   */
  select(node: FlatNode<T>): void {
    const { nodeDeselected, nodeSelected, selectedNode } = this;
    if (node === selectedNode) {
      nodeDeselected.emit(node.original);
      this.selectedNode = undefined;
    } else {
      if (selectedNode) {
        nodeDeselected.emit(selectedNode.original);
      }
      this.selectedNode = node;
      nodeSelected.emit(node.original);
    }
  }
}
