import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageService } from '../messages';


/**
 * Component wrapping and providing animations for center content.
 */
@Component({
  selector: 'ccf-drawer-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./content.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 0 })),

      transition('false <=> true', animate('1s'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnDestroy {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-drawer-content';
  /** Whether animations are enabled. */
  @HostBinding('class.cff-drawer-content-animations') animationsEnabled = false;
  /** Left margin size. */
  @HostBinding('style.margin-left.px') leftMargin = 0;
  /** Right margin size. */
  @HostBinding('style.margin-right.px') rightMargin = 0;
  /** Whether the content is invisible. */
  @HostBinding('@fadeInOut') faded = false;

  /** References to the side drawers. */
  private drawers: DrawerComponent[] = [];
  /** Subscriptions managed by this component. */
  private subscriptions = new Subscription();

  /**
   * Creates an instance of content component.
   *
   * @param messageService Service used to send and receive event messages.
   * @param cdr The change detector reference.
   */
  constructor(messageService: MessageService,
              cdr: ChangeDetectorRef) {
    const messages = messageService.connect(this).getMessages();
    this.subscriptions.add(messages.subscribe(msg => {
      if (this.handleMessage(msg)) {
        cdr.markForCheck();
      }
    }));
  }

  /** Cleans up all subscriptions. */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Process an event message.
   *
   * @param msg The event.
   * @returns true if change detection needs to run.
   */
  private handleMessage(msg: Message): boolean {
    switch (msg.payload.type) {
      case 'drawer-containers-changed':
        this.drawers = msg.payload.drawers as DrawerComponent[];
        this.updateFaded();
        return true;

      case 'drawer-initialized':
        this.animationsEnabled = true;
        return true;

      case 'drawer-toggled': {
        const position = (msg.source as DrawerComponent).position;
        const { opened, width, margin } = msg.payload;

        this.updateMargin(position, opened, width, margin);
        this.updateFaded();
        return true;
      }

      default:
        return false;
    }
  }

  /**
   * Updates a margin.
   *
   * @param position Start (left) or end (right) margin.
   * @param opened Whether the drawer is opened.
   * @param width The width of the drawer if opened.
   * @param margin The margin size.
   */
  private updateMargin(position: 'start' | 'end', opened: boolean,
                       width: number, margin: number): void {
    const offset = opened ? width + margin : margin;
    if (position === 'start') {
      this.leftMargin = offset;
    } else {
      this.rightMargin = offset;
    }
  }

  /**
   * Checks and updates the faded state based on the drawer states.
   */
  private updateFaded(): void {
    const [start, end] = this.drawers;
    const startExpanded = start?.opened && start?.expanded;
    const endExpanded = end?.opened && end?.expanded;
    this.faded = !!(startExpanded || endExpanded);
  }
}
