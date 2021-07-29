/* eslint-disable no-underscore-dangle */
import { Any } from '@angular-ru/common/typings';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Injector, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModelState, RUI_ORGANS } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';

import { TrackingPopupComponent, TrackingState } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemingService } from './core/services/theming/theming.service';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganData } from './core/store/reference-data/reference-data.state';

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

  /** Configuration Options **/
  @Input() baseHref: string;
  @Input()
    get embedded(): boolean { return this._embedded; }
    set embedded(embedded: string | boolean) {
      if (typeof embedded === 'string') {
        this._embedded = embedded.toLowerCase() === 'true';
      } else if (typeof embedded === 'boolean') {
        this._embedded = embedded;
      }
    }

  @Input()
    get useDownload(): boolean { return this._useDownload; }
    set useDownload(useDownload: string | boolean) {
      if (typeof useDownload === 'string') {
        this._useDownload = useDownload.toLowerCase() === 'true';
      } else if (typeof useDownload === 'boolean') {
        this._useDownload = useDownload;
      }
    }

  @Input()
    get user(): User { return this._user; }
    set user(user: User | string) {
      if (typeof user === 'string') {
        this._user = JSON.parse(user);
      } else {
        this._user = user;
      }
    }

  @Input()
    get organ(): OrganData { return this._organ; }
    set organ(organ: OrganData | string) {
      if (typeof organ === 'string') {
        this._organ = JSON.parse(organ);
      } else {
        this._organ = organ;
      }
    }

  @Input()
    get editRegistration(): SpatialEntityJsonLd { return this._editRegistration; }
    set editRegistration(editRegistration: SpatialEntityJsonLd | string) {
      if (typeof editRegistration === 'string') {
        this._editRegistration = JSON.parse(editRegistration);
      } else {
        this._editRegistration = editRegistration;
      }
    }

  @Input()
    get register(): (Any) => void { return this._register; }
    set register(register: Any) {
      if (typeof register === 'string') {
        console.error('RUI.register is unable to be set to a string. Expecting \'() => void\' format.');
      } else {
        this._register = register;
      }
    }

  @Input()
    get fetchPreviousRegistrations(): () => SpatialEntityJsonLd[] { return this._fetchPreviousRegistrations; }
    set fetchPreviousRegistrations(fetchPreviousRegistrations: Any) {
      if (typeof fetchPreviousRegistrations === 'string') {
        console.error('RUI.fetchPreviousRegistrations is unable to be set to a string.  Expecting \'() => SpatialEntityJsonLD[]\' format.');
      } else {
        this._fetchPreviousRegistrations = fetchPreviousRegistrations;
      }
    }

  @Input()
    get cancelRegistration(): () => void { return this._cancelRegistration; }
    set cancelRegistration(cancelRegistration: Any) {
      if (typeof cancelRegistration === 'string') {
        console.error('RUI.cancelRegistration is unable to be set to a string.  Expecting \'() => void\' format.');
      } else {
        this._cancelRegistration = cancelRegistration;
      }
    }

  /** Organs to be displayed in the organ selector */
  organList = RUI_ORGANS;

  /** True if the organ selector drawer is open */
  open = true;

  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** Clean internal variables, for use with configuration options. **/
  private _embedded = false;
  private _useDownload = false;
  private _user: User;
  private _organ: OrganData;
  private _editRegistration: SpatialEntityJsonLd;
  private _register: (Any) => void;
  private _fetchPreviousRegistrations: () => SpatialEntityJsonLd[];
  private _cancelRegistration: () => void;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(readonly model: ModelState, readonly page: PageState, ga: GoogleAnalyticsService,
    readonly tracking: TrackingState, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
    el: ElementRef<unknown>, injector: Injector) {
    theming.initialize(el, injector);
    this.subscriptions.add(
      page.embedded$.subscribe((embedded) => { this.open = !embedded; })
    );
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => { this.registrationStarted = registrationStarted; })
    );
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {preClose: () => {snackBar.dismiss();} },
      duration: this.tracking.snapshot.allowTelemetry === undefined ? Infinity : 3000
    });

    // @TODO:  Remove log
    console.log('this: ', this);
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
