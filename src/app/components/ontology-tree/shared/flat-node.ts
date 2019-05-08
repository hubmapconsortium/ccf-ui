import { isArrayLikeObject } from 'lodash';
import { isObservable, Observable } from 'rxjs';

export interface NodeLike<T extends NodeLike<T>> {
  name: string;
  parent?: T;
  children?: Observable<T[]> | T[];
}

export class FlatNode<T extends NodeLike<T>> {
  get name(): string { return this.original.name; }
  expandable: boolean;

  static create<T extends NodeLike<T>>(original: T, level: number): FlatNode<T> {
    return new FlatNode(original, level);
  }

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
