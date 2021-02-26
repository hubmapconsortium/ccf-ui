import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModelState, RUI_ORGANS } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';


@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === undefined ? false : true)
  );

  organList = RUI_ORGANS;

  open = true;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(readonly model: ModelState, readonly page: PageState) {
    this.subscriptions.add(
      page.embedded$.subscribe((embedded) => { this.open = !embedded; })
    );
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
