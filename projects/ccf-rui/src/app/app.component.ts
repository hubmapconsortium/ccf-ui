import { ChangeDetectionStrategy, Component, ElementRef, Injector, OnDestroy, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
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

  /** Disables changes in block position */
  disablePositionChange = false;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  readonly header$ = this.globalConfig.getOption('header');

  readonly theme$ = this.globalConfig.getOption('theme');

  theme: string;

  homeUrl: string;

  logoTooltip: string;

  constructor(
    readonly model: ModelState, readonly page: PageState,
    readonly consentService: ConsentService, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
    el: ElementRef<unknown>, injector: Injector, private readonly globalConfig: GlobalConfigState<GlobalConfig>
  ) {
    theming.initialize(el, injector);
    this.subscriptions.add(
      page.registrationCallbackSet$.subscribe((callbackSet) => {
        this.open = !callbackSet;
      })
    );
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => {
        this.registrationStarted = registrationStarted;
      })
    );
    this.theme$.subscribe((theme: string) => {
      this.theme = theme;
    });
    this.globalConfig.getOption('homeUrl').subscribe((url: string) => {
      this.homeUrl = url;
    });
    this.globalConfig.getOption('logoTooltip').subscribe((tooltip: string) => {
      this.logoTooltip = tooltip;
    });
    console.log(this.globalConfig)
    console.log(this.theme)
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        }
      },
      duration: this.consentService.consent === 'not-set' ? Infinity : 3000
    });

    this.theming.setTheme(`${this.theme}-theme-light`);

    // if (window.matchMedia) {
    //   // Sets initial theme according to user theme preference
    //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     this.theming.setTheme(`${this.theme}-theme-dark`);
    //   }

    //   // Listens for changes in user theme preference
    //   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    //     this.theming.setTheme(e.matches ? `${this.theme}-theme-dark` : `${this.theme}-theme-light`);
    //   });
    // } else {
    //   this.theming.setTheme(`${this.theme}-theme-light`);
    // }
  }

  /**
   * Toggles scheme between light and dark mode
   */
   toggleScheme(): void {
    this.theming.setTheme((this.theming.getTheme() === `${this.theme}-theme-light`) ? `${this.theme}-theme-dark` : `${this.theme}-theme-light`);
  }

  /**
   * Shifts block position when certain keys are pressed
   *
   * @param target The keyboard event
   */
  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    const oldPosition = this.model.snapshot.position;
    if (this.disablePositionChange || !this.registrationStarted) {
      return;
    }
    target.preventDefault();
    const delta = target.repeat ? 1.0 : 0.5;
    let newPosition = oldPosition;
    switch (target.key) {
      case 'q':
        newPosition = { ...oldPosition, z: oldPosition.z + delta };
        break;
      case 'e':
        newPosition = { ...oldPosition, z: oldPosition.z - delta };
        break;
      case 'w':
        newPosition = { ...oldPosition, y: oldPosition.y + delta };
        break;
      case 's':
        newPosition = { ...oldPosition, y: oldPosition.y - delta };
        break;
      case 'a':
        newPosition = { ...oldPosition, x: oldPosition.x - delta };
        break;
      case 'd':
        newPosition = { ...oldPosition, x: oldPosition.x + delta };
        break;
      default:
        break;
    }
    this.model.setPosition(newPosition);
  }

  /**
   * Disables block position change if an input element is clicked
   *
   * @param target The element clicked
   */
  @HostListener('document:click', ['$event.target'])
  handleClick(target: HTMLElement): void {
    if (target.nodeName === 'INPUT') {
      this.disablePositionChange = true;
    } else {
      this.disablePositionChange = false;
    }
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
