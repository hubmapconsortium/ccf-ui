import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';
import { ThemingService } from './core/services/theming/theming.service';
import { ModelState } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';

export interface User {
  firstName: string;
  lastName: string;
}

interface AppOptions extends GlobalConfig {
  theme?: string;
  header?: boolean;
  homeUrl?: string;
  logoTooltip?: string;
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
  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** Disables changes in block position */
  disablePositionChange = false;

  registrationExpanded = false;

  get isLightTheme(): boolean {
    return this.theming.getTheme().endsWith('light');
  }

  readonly theme$ = this.globalConfig.getOption('theme');
  readonly themeMode$ = new ReplaySubject<'light' | 'dark'>(1);

  readonly header$ = this.globalConfig.getOption('header');
  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');
  readonly logoTooltip$ = this.globalConfig.getOption('logoTooltip');

  theme!: string;

  homeUrl!: string;

  logoTooltip!: string;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(
    readonly model: ModelState, readonly page: PageState,
    readonly consentService: ConsentService, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
    el: ElementRef<unknown>, injector: Injector, private readonly globalConfig: GlobalConfigState<AppOptions>, cdr: ChangeDetectorRef
  ) {
    theming.initialize(el, injector);
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => {
        this.registrationStarted = registrationStarted;
      })
    );
    this.theme$.subscribe((theme) => {
      this.theme = theme ?? 'light';
    });
    this.globalConfig.getOption('homeUrl').subscribe((url) => {
      this.homeUrl = url ?? '';
    });
    this.globalConfig.getOption('logoTooltip').subscribe((tooltip) => {
      this.logoTooltip = tooltip ?? '';
    });

    combineLatest([this.theme$, this.themeMode$]).subscribe(
      ([theme, mode]) => {
        this.theming.setTheme(`${theme}-theme-${mode}`);
        cdr.markForCheck();
      }
    );
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

    this.themeMode$.next('light');

    this.theming.setTheme(`${this.theme}-theme-light`);
  }

  /**
   * Toggles scheme between light and dark mode
   */
  toggleScheme(): void {
    this.themeMode$.next(this.isLightTheme ? 'dark' : 'light');
  }

  registrationToggle(event: boolean): void {
    this.registrationExpanded = event;
    if (!this.registrationExpanded) {
      this.disablePositionChange = false;
    }
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
  @HostListener('document:mousedown', ['$event.target'])
  handleClick(target: HTMLElement): void {
    const disableWhenClicked = ['mat-mdc-input-element', 'form-input-label'];
    for (const className of disableWhenClicked) {
      if (typeof target.className === 'string' && target.className.includes(className)) {
        this.disablePositionChange = true;
        return;
      }
    }
    this.disablePositionChange = false;
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
