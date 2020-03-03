import { ChangeDetectorRef, Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, mergeAll } from 'rxjs/operators';


export interface Container {
  cdr: ChangeDetectorRef;
  drawers: Observable<Drawer[]>;
  content: Observable<Content>;
}

export interface Content {
  animationsEnabled: boolean;
  leftMargin: number;
  rightMargin: number;
  faded: boolean;
}

export interface Drawer {
  position: string;
  openedState: string;
  expandedState: string;
  stateChange: Observable<void>;
  measuredWidth: number;
  //
}


function maybeApply<T, R>(obj: T | undefined, func: (obj: T) => R): R | undefined;
function maybeApply<T, R, D = R>(obj: T | undefined, func: (obj: T) => R, defaultValue: D): R | D;
function maybeApply(obj: unknown, func: (obj: unknown) => unknown, defaultValue?: unknown): unknown {
  if (obj === undefined) { return defaultValue; }
  return func(obj);
}


class Connector {
  private contentAnimationsEnabled = false;
  private subscriptions = new Subscription();

  constructor(private cdr: ChangeDetectorRef,
              private content: Content | undefined,
              private drawer1: Drawer | undefined,
              private drawer2: Drawer | undefined) {
    const drawerCount = maybeApply(drawer1, () => 1, 0) + maybeApply(drawer2, () => 1, 0);
    const subscription = of(drawer1?.stateChange, drawer2?.stateChange).pipe(
      filter((obs): obs is Observable<void> => !!obs),
      mergeAll(),
      map((_unused, index) => index)
    ).subscribe(index => {
      if (index > drawerCount) { this.contentAnimationsEnabled = true; }
      this.update();
    });

    this.subscriptions.add(subscription);
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }

  private update(): void {
    this.updateContent();
    this.updateDrawer(this.drawer1, this.drawer2);
    this.updateDrawer(this.drawer2, this.drawer1);
    this.cdr.markForCheck();
  }

  private updateContent(): void {
    const content = this.content;
    if (content) {
      function isExpanded(drawer: Drawer): boolean {
        return (drawer.openedState !== 'closed' &&
                drawer.expandedState !== 'closed');
      }
      function margin(drawer: Drawer): number {
        return drawer.openedState !== 'closed' ? drawer.measuredWidth : 0;
      }

      const faded = (maybeApply(this.drawer1, isExpanded, false) ||
                     maybeApply(this.drawer2, isExpanded, false));

      content.animationsEnabled = this.contentAnimationsEnabled;
      content.faded = faded;
      content.leftMargin = maybeApply(this.drawer1, margin, 0);
      content.rightMargin = maybeApply(this.drawer2, margin, 0);
    }
  }

  private updateDrawer(drawer: Drawer | undefined, other: Drawer | undefined): void {
    //
  }
}


@Injectable()
export class ConnectorService {
  attach(container: Container): void {
    let prevConnector: Connector | undefined;

    // Not a subscription leak!
    combineLatest([container.content, container.drawers]).pipe(
      map(([content, [drawer1, drawer2]]) => {
        if (drawer1.position === 'end') { ([drawer1, drawer2] = [drawer2, drawer1]); }
        return new Connector(container.cdr, content, drawer1, drawer2);
      })
    ).subscribe({
      next(connector) {
        prevConnector?.destroy();
        prevConnector = connector;
      },
      complete() {
        prevConnector?.destroy();
      }
    });
  }
}
