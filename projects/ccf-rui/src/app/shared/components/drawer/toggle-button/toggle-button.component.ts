import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageService } from '../messages';


/**
 * Implements open/close button for the side drawers.
 */
@Component({
  selector: 'ccf-drawer-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent implements AfterViewInit, OnDestroy {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-drawer-toggle-button';
  /** Whether this button is attach to a drawer in position 'end'. */
  @HostBinding('class.ccf-drawer-toggle-button-end')
  get classEnd(): boolean {
    return this.position === 'end';
  }

  /** Gets the name of the icon to display. */
  get icon(): string {
    let expand = 'arrow_right';
    let collapse = 'arrow_left';
    if (this.position === 'end') {
      ([expand, collapse] = [collapse, expand]);
    }

    return this.opened ? collapse : expand;
  }

  /** Position of the owning side drawer. */
  private position: 'start' | 'end' = 'start';
  /** Whether the owning drawer is opened. */
  private opened = false;
  /** Subscriptions managed by this component. */
  private subscriptions = new Subscription();

  /**
   * Creates an instance of toggle button component.
   *
   * @param drawer The owning side drawer.
   * @param messageService Service used to send and receive event messages.
   * @param cdr The change detector reference.
   */
  constructor(private drawer: DrawerComponent,
              messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    const channel = messageService.connect(this);
    this.subscriptions.add(channel.getMessagesFromSource(drawer).subscribe(msg => {
      if (this.handleMessage(msg)) {
        cdr.markForCheck();
      }
    }));
  }

  /**
   * Initializes this component.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.position = this.drawer.position;
      this.cdr.markForCheck();
    });
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Process an event message.
   *
   * @param msg The event.
   * @returns true if change detection needs to be run.
   */
  handleMessage(msg: Message): boolean {
    if (msg.payload.type === 'drawer-toggled') {
      this.opened = msg.payload.opened;
      return true;
    }

    return false;
  }

  /**
   * Updates the drawer state.
   */
  toggle(): void {
    const drawer = this.drawer;
    const { opened, expanded } = drawer;
    if (opened) {
      if (expanded) {
        drawer.closeExpanded();
      } else {
        drawer.close();
      }
    } else {
      drawer.open();
    }
  }
}
