import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

/** Key-Value pair */
export type KVPair<T = unknown> = [string, T];
/** Array of Key-Value pairs */
export type KVList<T = unknown> = KVPair<T>[];

/**
 * Simple component for displaying the current values in the data store.
 */
@Component({
  selector: 'ccf-store-debug',
  templateUrl: './store-debug.component.html',
  styleUrls: ['./store-debug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreDebugComponent implements OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-store-debug';

  /**
   * Gets the store data as a list of state name to key-value pairs
   */
  get data(): KVList<KVList> {
    const states: KVList<Record<string, unknown>> = Object.entries(this.root);
    const stateValues: KVList<KVList> = states.map(([key, values]) => [key, Object.entries(values)]);
    const statesWithData = stateValues.filter(([_key, values]) => values.length > 0);
    return statesWithData;
  }

  /** Latest store data */
  private root: Record<string, Record<string, unknown>> = {};

  /** Subscriptions managed by this component */
  private subscriptions = new Subscription();

  /**
   * Creates an instance of store debug component.
   * Sets up the store data listeners.
   *
   * @param store The data store.
   * @param cdr Change detection for this component.
   */
  constructor(store: Store, cdr: ChangeDetectorRef) {
    const sub = store.subscribe(root => {
      this.root = root as Record<string, Record<string, unknown>>;
      cdr.markForCheck();
    });

    this.subscriptions.add(sub);
  }

  /**
   * Cleans up subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
