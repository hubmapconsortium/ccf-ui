import { isArrayLikeObject } from 'lodash';
import { isObservable, Observable } from 'rxjs';

/**
 * An object which has a tree node like structure with a label.
 */
export interface NodeLike<T extends NodeLike<T>> {
  /**
   * The display name of this node.
   */
  label: string;

  /**
   * Parent node - undefined if this is a root node.
   */
  parent?: T;

  /**
   * Child nodes - undefined if this is a leaf node.
   */
  children?: Observable<T[]> | T[];
}

/**
 * A flat tree node.
 */
export class FlatNode<T extends NodeLike<T>> {
  /**
   * Same as the original node's label.
   */
  get label(): string { return this.original.label; }

  /**
   * Indicates whether this node has children.
   */
  expandable: boolean;

  /**
   * Creates a flat node from a node like object and a level in the tree.
   *
   * @param original The original node like object.
   * @param level The level of the new flat node in the tree.
   * @returns The newly created flat node.
   */
  static create<T extends NodeLike<T>>(original: T, level: number): FlatNode<T> {
    return new FlatNode(original, level);
  }

  /**
   * Creates an instance of flat node.
   *
   * @param original The original node like object.
   * @param level The level of the new flat node in the tree.
   */
  constructor(readonly original: T, readonly level: number) {
    const { children } = original;
    if (isObservable(children)) {
      this.expandable = true;
    } else if (isArrayLikeObject(children) && children.length > 0) {
      this.expandable = true;
    } else {
      this.expandable = false;
    }
  }
}
