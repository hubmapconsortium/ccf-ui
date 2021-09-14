import { ChangeDetectionStrategy, Component, ElementRef, Injector, OnDestroy, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent, TrackingState } from 'ccf-shared';
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

  constructor(
    readonly model: ModelState, readonly page: PageState,
    readonly tracking: TrackingState, readonly snackbar: MatSnackBar, readonly theming: ThemingService,
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
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        }
      },
      duration: this.tracking.snapshot.allowTelemetry === undefined ? Infinity : 3000
    });
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
    let newPosition = oldPosition;
    switch (target.key) {
      case 'q':
        newPosition = { ...oldPosition, z: oldPosition.z + 0.5 };
        break;
      case 'e':
        newPosition = { ...oldPosition, z: oldPosition.z - 0.5 };
        break;
      case 'w':
        newPosition = { ...oldPosition, y: oldPosition.y + 0.5 };
        break;
      case 's':
        newPosition = { ...oldPosition, y: oldPosition.y - 0.5 };
        break;
      case 'a':
        newPosition = { ...oldPosition, x: oldPosition.x - 0.5 };
        break;
      case 'd':
        newPosition = { ...oldPosition, x: oldPosition.x + 0.5 };
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
