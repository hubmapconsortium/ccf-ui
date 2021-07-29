/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Any } from '@angular-ru/common/typings';
import { ChangeDetectionStrategy, Component, ElementRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Debounce } from '@ngxs-labs/data/decorators';
import { Actions } from '@ngxs/store';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { GlobalConfigState, TrackingPopupComponent, TrackingState } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ObservableInput, Subscription } from 'rxjs';

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

  /** Configuration Options **/
  @Input() baseHref: string;
  @Input()
    get embedded(): boolean | undefined { return this._embedded; }
    set embedded(embedded: string | boolean | undefined) {
      if (typeof embedded === 'string') {
        this._embedded = embedded.toLowerCase() === 'true';
      } else if (typeof embedded === 'boolean') {
        this._embedded = embedded;
      }
    }

  @Input()
    get useDownload(): boolean | undefined { return this._useDownload; }
    set useDownload(useDownload: string | boolean | undefined) {
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
    get organ(): GlobalConfig['organ'] { return this._organ; }
    set organ(organ: GlobalConfig['organ'] | string) {
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
    get register(): (data: unknown) => void { return this._register; }
    set register(register: Any) {
      if (typeof register === 'string') {
        console.error('RUI.register is unable to be set to a string. Expecting \'() => void\' format.');
      } else {
        this._register = register;
      }
    }

  @Input()
    get fetchPreviousRegistrations(): () => ObservableInput<Record<string, unknown>[]> { return this._fetchPreviousRegistrations; }
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
        this.updateGlobalConfig();
      }
    }

  /** Organs to be displayed in the organ selector */
  organList = RUI_ORGANS;

  /** True if the organ selector drawer is open */
  open = true;

  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** Clean internal variables, for use with configuration options. **/
  private _embedded: boolean | undefined;
  private _useDownload: boolean | undefined;
  private _user: User;
  private _organ: GlobalConfig['organ'];
  private _editRegistration: SpatialEntityJsonLd;
  private _register: (data: unknown) => void;
  private _fetchPreviousRegistrations: () => ObservableInput<Record<string, unknown>[]>;
  private _cancelRegistration: () => void;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(
    readonly model: ModelState, readonly page: PageState, ga: GoogleAnalyticsService,
    readonly tracking: TrackingState, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
    el: ElementRef<unknown>, injector: Injector, private readonly globalConfig: GlobalConfigState<GlobalConfig>
  ) {
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

    this.updateGlobalConfig(true);
  }

  @Debounce(20)
  updateGlobalConfig(useWindowConfig = false): void {
    const { embedded, useDownload, user, organ, editRegistration, register, fetchPreviousRegistrations, cancelRegistration } = this;
    const windowConfigKey = 'ruiConfig';
    let config: GlobalConfig = {};

    if (useWindowConfig && windowConfigKey in globalThis) {
      config = (globalThis as Record<string, unknown>)[windowConfigKey] as GlobalConfig;
    }

    const inputs = {
      embedded,
      useDownload,
      user,
      organ,
      editRegistration,
      register,
      fetchPreviousRegistrations,
      cancelRegistration
    };

    for (const key in inputs) {
      if (inputs[key] != null) {
        config[key] = inputs[key];
      }
    }

    this.globalConfig.patchConfig(config);
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
