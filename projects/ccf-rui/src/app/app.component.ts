import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModelState, RUI_ORGANS } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';


/**
 * App component
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  /** Organs to be displayed in the organ selector */
  organList = RUI_ORGANS;

  /** True if the organ selector drawer is open */
  open = true;

  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(readonly model: ModelState, readonly page: PageState) {
    this.subscriptions.add(
      page.embedded$.subscribe((embedded) => { this.open = !embedded; })
    );
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => { this.registrationStarted = registrationStarted; })
    );
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
