import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, HostBinding, OnDestroy, QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { ContentComponent } from '../content/content.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageChannel, MessageService } from '../messages';


/**
 * Helper function for creating drawer errors.
 *
 * @param position The position of the drawer.
 * @throws {Error} Error with useful message is always thrown.
 */
function throwDuplicateDrawersError(position: 'start' | 'end'): never {
  throw new Error(`Multiple drawers in position ${position}`);
}


/**
 * Main container for drawer components.
 */
@Component({
  selector: 'ccf-drawer-container',
  exportAs: 'ccfDrawerContainer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-drawer-container';

  /** Drawer components in this container. */
  @ContentChildren(DrawerComponent, { descendants: true })
  private drawers!: QueryList<DrawerComponent>;

  /** Content component if provided already wrapped. */
  @ContentChildren(ContentComponent, { descendants: true })
  private content1!: QueryList<ContentComponent>;
  /** Content component if provided without wrapping. */
  @ViewChildren(ContentComponent)
  private content2!: QueryList<ContentComponent>;
  /** Resolves the content component. */
  private get content(): ContentComponent {
    return this.content1.first ?? this.content2.first;
  }

  /** Whether the content was wrapped. */
  get hasWrappedContent(): boolean {
    return this.content1.length !== 0;
  }

  /** The connected message channel. */
  private channel: MessageChannel;
  /** All subscriptions managed by the container. */
  private subscriptions = new Subscription();

  /**
   * Creates an instance of container component.
   *
   * @param messageService The service used to send event messages.
   * @param cdr The change detector reference.
   */
  constructor(messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    this.channel = messageService.connect(this);
    this.subscriptions.add(this.channel.getMessages().subscribe(msg => {
      if (this.handleMessage(msg)) {
        cdr.markForCheck();
      }
    }));
  }

  /**
   * Sets up all listeners after all content has been projected.
   */
  ngAfterViewInit(): void {
    this.drawers.changes.pipe(startWith(null)).subscribe(() => {
      const drawers = this.validateDrawers();
      this.channel.sendMessage({
        type: 'drawer-containers-changed',
        drawers
      });
      this.cdr.markForCheck();
    });

    this.content1.changes.pipe(startWith(null)).subscribe(() => {
      this.channel.sendMessage({
        type: 'content-container-changed',
        content: this.content
      });
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
   * Processes event messages.
   *
   * @param _msg The event.
   * @returns true if change detection needs to be run.
   */
  private handleMessage(_msg: Message): boolean {
    return true;
  }

  /**
   * Validates the number of drawers and their positions.
   *
   * @returns A tuple containing the start and end drawers.
   */
  private validateDrawers(): [DrawerComponent | undefined, DrawerComponent | undefined] {
    const drawers = this.drawers.toArray();
    const startDrawers = drawers.filter(drawer => drawer.position === 'start');
    const endDrawers = drawers.filter(drawer => drawer.position === 'end');

    if (startDrawers.length > 1) {
      throwDuplicateDrawersError('start');
    }
    if (endDrawers.length > 1) {
      throwDuplicateDrawersError('end');
    }

    return [startDrawers[0], endDrawers[0]];
  }
}
