import { ChangeDetectionStrategy, Component, ElementRef, Injector, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent, TrackingState } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Subscription } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';
import { ThemingService } from './core/services/theming/theming.service';
import { ModelState, RUI_ORGANS } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';

export interface User {
  firstName: string;
  lastName: string;
}

/**
 * App component
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {
  /** Organs to be displayed in the organ selector */
  organList = RUI_ORGANS;

  /** True if the organ selector drawer is open */
  open = true;

  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(
    readonly model: ModelState, readonly page: PageState, ga: GoogleAnalyticsService,
    readonly tracking: TrackingState, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
    el: ElementRef<unknown>, injector: Injector, private readonly globalConfig: GlobalConfigState<GlobalConfig>
  ) {
    theming.initialize(el, injector);
    this.subscriptions.add(
      page.registrationCallbackSet$.subscribe((callbackSet) => { this.open = !callbackSet; })
    );
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => { this.registrationStarted = registrationStarted; })
    );
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: { preClose: () => { snackBar.dismiss(); } },
      duration: this.tracking.snapshot.allowTelemetry === undefined ? Infinity : 3000
    });
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
