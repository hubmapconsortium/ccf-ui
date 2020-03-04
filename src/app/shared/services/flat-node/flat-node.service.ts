import { Injectable } from '@angular/core';
import { OntologyNode } from '../../models/ontology-node.model';

@Injectable({
  providedIn: 'root'
})
export class FlatNodeService {

  get label(): string { return this.original.label; }

  /**
   * Indicates whether this node has children.
   */
  get expandable(): boolean { return this.original.children.length > 0; }

  /**
   * Creates a flat node from a ontology node object and a level in the tree.
   *
   * @param original The original ontology node object.
   * @param level The level of the new flat node in the tree.
   * @returns The newly created flat node.
   */
  static create(original: OntologyNode, level: number): FlatNodeService {
    return new FlatNodeService(original, level);
  }

  /**
   * Creates an instance of flat node.
   *
   * @param original The original ontology node object.
   * @param level The level of the new flat node in the tree.
   */
  constructor(readonly original: OntologyNode, readonly level: number) { }
}
