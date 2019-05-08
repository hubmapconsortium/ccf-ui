import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { filter, isArray, property } from 'lodash';
import { Observable } from 'rxjs';

import { FlatNode, NodeLike } from './shared/flat-node';

const getLevel = property<FlatNode<any>, number>('level');
const isExpandable = property<FlatNode<any>, boolean>('expandable');
const getChildren = property<NodeLike<any>, Observable<any[]> | any[]>('children');

@Component({
  selector: 'ccf-ontology-tree',
  templateUrl: './ontology-tree.component.html',
  styleUrls: ['./ontology-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologyTreeComponent<T extends NodeLike<T>> {
  @Input()
  set nodes(nodes: T | T[]) {
    this.dataSource.data = isArray(nodes) ? nodes : [nodes];
  }

  @Output() nodeSelected = new EventEmitter<T>();
  @Output() nodeDeselected = new EventEmitter<T>();

  readonly indent = '1.5rem';

  readonly control = new FlatTreeControl<FlatNode<T>>(getLevel, isExpandable);
  readonly flattener = new MatTreeFlattener<T, FlatNode<T>>(FlatNode.create, getLevel, isExpandable, getChildren);
  readonly dataSource = new MatTreeFlatDataSource(this.control, this.flattener);

  private selectedNode?: FlatNode<T> = undefined;

  constructor(private cdr: ChangeDetectorRef) { }

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
    for (const flat of parentFlatNodes) { control.expand(flat); }

    // Select the node
    this.select(flatNode);

    // Detect changes
    cdr.detectChanges();
  }

  // Internal
  getDisabled(type: 'inner' | 'leaf'): boolean {
    return type === 'leaf' ? true : undefined;
  }

  getAriaLabel(type: 'inner' | 'leaf', node: FlatNode<T>): string {
    return type === 'inner' ? `toggle ${node.name}` : undefined;
  }

  isInnerNode(_index: number, node: FlatNode<T>): boolean {
    return node.expandable;
  }

  isSelected(node: FlatNode<T>): boolean {
    return node === this.selectedNode;
  }

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
