import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';


export type KVPair<T = unknown> = [string, T];
export type KVList<T = unknown> = KVPair<T>[];


@Component({
  selector: 'ccf-store-debug',
  templateUrl: './store-debug.component.html',
  styleUrls: ['./store-debug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreDebugComponent implements OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-store-debug';

  get data(): KVList<KVList> {
    const states: KVList<object> = Object.entries(this.root as object);
    const stateValues: KVList<KVList> = states.map(([key, values]) => {
      return [key, Object.entries(values)];
    });
    const statesWithData = stateValues.filter(([_key, values]) => values.length > 0);
    return statesWithData;
  }

  private root: unknown = {};
  private subscriptions = new Subscription();

  constructor(store: Store, cdr: ChangeDetectorRef) {
    const sub = store.subscribe(root => {
      this.root = root;
      cdr.markForCheck();
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
