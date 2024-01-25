/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener,
  Input, OnDestroy, Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Message, MessageChannel, MessageService } from '../messages';


/** Opened/closed state. */
type OpenedState = 'open' | 'open-instant' | 'closed';
/** Expanded/collapsed state. */
type ExpandedState = 'open' | 'open-instant' | 'closed';
/** Expanded state relative to an opposite drawer. */
type ExpandedState2 = 'collapsed' | 'half' | 'extended' | 'full';

/** Default animation parameters. */
const EXPAND_COLLAPSE_PARAMS_DEFAULT = {
  params: {
    width: 0,
    margin: 0,
    margin2: 0
  }
};

/**
 * Boolean state that can also be awaited.
 */
class InitializationState {
  /** Whether this state is true or false. */
  private initialized = false;
  /** Promise used to await on. */
  private deferred = new Promise<void>(resolve => {
    this.resolve = resolve;
  });
  /** Resolve function for the promise. */
  private resolve: () => void;

  /**
   * Sets the state to true and
   */
  set(): void {
    this.initialized = true;
    this.resolve();
  }

  /**
   * Gets a promise that resolves when this state is set to true.
   *
   * @returns A promise.
   */
  async wait(): Promise<void> {
    return this.deferred;
  }

  /**
   * Gets the boolean state of this object.
   *
   * @returns true if set has been called.
   */
  valueOf(): boolean {
    return this.initialized;
  }
}


/**
 * Side drawer component.
 * Contains all the logic for opening/closing/expanding.
 */
@Component({
  selector: 'ccf-drawer',
  exportAs: 'ccfDrawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('openClose', [
      state('open, open-instant', style({
        transform: 'none'
      })),
      state('closed', style({ })),

      transition('closed => open-instant', animate(0)),
      transition('closed <=> open, open-instant => closed', animate('.5s ease-in-out'))
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({})),
      state('half', style({
        width: 'calc(50% - {{ margin }}px)'
      }), EXPAND_COLLAPSE_PARAMS_DEFAULT),
      state('extended', style({
        width: 'calc(100% - {{ width }}px - {{ margin }}px)'
      }), EXPAND_COLLAPSE_PARAMS_DEFAULT),
      state('full', style({
        width: 'calc(100% - {{ margin }}px - {{ margin2 }}px)'
      }), EXPAND_COLLAPSE_PARAMS_DEFAULT),

      transition('* <=> *', animate('.5s ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements AfterViewInit, OnDestroy {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-drawer';
  /** Whether this is located at the end position. */
  @HostBinding('class.ccf-drawer-end')
  get classEnd(): boolean {
    return this.position === 'end';
  }

  /** Position of the drawer - start (left) or end (right). */
  @Input()// eslint-disable-line
  get position(): 'start' | 'end' {
    return this._position;
  }
  set position(value: 'start' | 'end') {
    this._position = value || 'start';
  }
  /** Property for position getter/setter. */
  private _position: 'start' | 'end' = 'start';

  /** Whether the drawer is opened. */
  @Input()
  @HostBinding('class.ccf-drawer-opened')
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    this.toggle(coerceBooleanProperty(value));
  }
  /** Property for opened getter/setter. */
  private _opened = false;

  /** Whether the drawer is expanded. */
  @Input()
  @HostBinding('class.ccf-drawer-expanded')
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: boolean) {
    this.toggleExpanded(coerceBooleanProperty(value));
  }
  /** Property for expanded getter/setter */
  private _expanded = false;

  /** Output emitting when the drawer has opened. */
  @Output() readonly openedChange = new EventEmitter<boolean>(true);
  /** Output emitting when the drawer has expanded. */
  @Output() readonly expandedChange = new EventEmitter<boolean>(true);
  /** Output emitting whenever the drawer state changes. */
  @Output() readonly stateChange = new EventEmitter<void>(true);

  /** Current open/close animation state. */
  @HostBinding('@openClose')
  openedState: OpenedState = 'closed';

  /** Expanded/collapsed state parameters. */
  @HostBinding('@expandCollapse')
  get expandedStateObj(): unknown {
    return { value: this.expandedState2, params: {
      width: this.width, margin: this.measuredMargin,
      margin2: this.margin2
    } };
  }
  /** Current expanded/collapsed animation state. */
  expandedState: ExpandedState = 'closed';
  /** Current expanded state relative to the opposite drawer. */
  private expandedState2: ExpandedState2 = 'collapsed';

  /** Gets the calculated width of the drawer. */
  private get measuredWidth(): number {
    if (this._measuredWidth > 0) {
      return this._measuredWidth;
    }

    const element = this.element.nativeElement;
    if (!element) {
      return 0;
    }

    const bbox = element.getBoundingClientRect();
    const width = bbox.right - bbox.left;
    if (width === 0) {
      return 0;
    }

    this._measuredWidth = width;
    return width;
  }
  /** Cached measured width. */
  private _measuredWidth = 0;
  /** Width of opposite drawer. */
  private width = 0;

  /** Gets the calculated margin of the drawer. */
  private get measuredMargin(): number {
    if (this._measuredMargin > 0) {
      return this._measuredMargin;
    }

    const element = this.element.nativeElement;
    if (!element) {
      return 0;
    }

    const styles = globalThis.getComputedStyle(element);
    const property = this.position === 'start' ? 'margin-right' : 'margin-left';
    const value = styles.getPropertyValue(property);
    const margin = Number(value.slice(0, -2));

    this._measuredMargin = margin;
    return margin;
  }
  /** Cached measured margin. */
  private _measuredMargin = 0;
  /** Margin of the opposite drawer. */
  private margin2 = 0;

  /** Initialization state. */
  private initialized = new InitializationState();
  /** Connected message channel. */
  private channel: MessageChannel;
  /** Subscriptions managed by this component. */
  private subscriptions = new Subscription();

  /**
   * Creates an instance of drawer component.
   *
   * @param messageService Service for sending/receiving event messages.
   * @param cdr The change detector reference.
   * @param element Reference to components HTML element.
   */
  constructor(messageService: MessageService,
              cdr: ChangeDetectorRef,
              private element: ElementRef<HTMLElement>) {
    this.channel = messageService.connect(this);
    this.subscriptions.add(this.channel.getMessages().subscribe(msg => {
      if (this.handleMessage(msg)) {
        cdr.markForCheck();
      }
    }));
  }

  /**
   * Initializes this component.
   */
  ngAfterViewInit(): void {
    this.initialized.set();
    setTimeout(() => this.channel.sendMessage({ type: 'drawer-initialized' }));
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Opens the drawer.
   */
  open(): void {
    this.toggle(true);
  }

  /**
   * Closes the drawer.
   */
  close(): void {
    this.toggle(false);
  }

  /**
   * Toggles the drawer between opened and closed.
   *
   * @param [opened] Whether to open or close the drawer.
   */
  toggle(opened = !this.opened): void {
    if (this.opened === opened) {
      return;
    }

    if (!opened) {
      this.openedState = 'closed';
      this.expandedState = 'closed';
      this.expandedState2 = 'collapsed';
      this._expanded = false;
    } else if (this.initialized.valueOf()) {
      this.openedState = 'open';
    } else {
      this.openedState = 'open-instant';
    }

    this._opened = opened;
    this.sendToggle();
  }

  /**
   * Expands the drawer.
   */
  openExpanded(): void {
    this.toggleExpanded(true);
  }

  /**
   * Collapses the drawer.
   */
  closeExpanded(): void {
    this.toggleExpanded(false);
  }

  /**
   * Toggles the drawer between expanded and collapsed.
   *
   * @param [expanded] Whether to expand or collapse the drawer.
   */
  toggleExpanded(expanded = !this.expanded): void {
    if (this.expanded === expanded) {
      return;
    }

    if (!expanded) {
      this.expandedState = 'closed';
      this.expandedState2 = 'collapsed';
    } else if (this.initialized.valueOf()) {
      this.expandedState = 'open';
    } else {
      this.expandedState = 'open-instant';
    }

    this._expanded = expanded;
    this.sendToggle();
  }

  /**
   * Listener to open/close animation completion.
   */
  @HostListener('@openClose.done')
  closeOpenDone(): void {
    this.openedChange.emit(this.opened);
  }

  /**
   * Listener to expand/collapse animation completion.
   */
  @HostListener('@expandCollapse.done')
  expandCollapseDone(): void {
    this.expandedChange.emit(this.expanded);
  }

  /**
   * Sends a toggle event to the channel.
   * Waits until initialization is completed before sending.
   */
  private async sendToggle(): Promise<void> {
    await this.initialized.wait();
    this.channel.sendMessage({
      type: 'drawer-toggled',
      opened: this.opened,
      expanded: this.expanded,
      width: this.measuredWidth,
      margin: this.measuredMargin
    });
    this.stateChange.emit();
  }

  /**
   * Processes an event.
   *
   * @param msg The event.
   * @returns true if change detection should run.
   */
  private handleMessage(msg: Message): boolean {
    switch (msg.payload.type) {
      case 'drawer-toggled': {
        const other = msg.source as DrawerComponent;
        this.syncExpanded(other);
        return true;
      }

      default:
        return false;
    }
  }

  /**
   * Syncs the drawer widths and margin against the opposite drawer.
   *
   * @param other The opposite drawer.
   */
  private syncExpanded(other: DrawerComponent): void {
    if (this.expanded || other.expanded) {
      if (this.expanded && other.expanded) {
        this.expandedState2 = other.expandedState2 = 'half';
      } else if (this.expanded) {
        if (other.opened) {
          this.expandedState2 = 'extended';
          this.width = other.measuredWidth + other.measuredMargin;
        } else {
          this.expandedState2 = 'full';
          this.margin2 = other.measuredMargin;
        }
      } else {
        if (this.opened) {
          other.expandedState2 = 'extended';
          other.width = this.measuredWidth + this.measuredMargin;
        } else {
          other.expandedState2 = 'full';
          other.margin2 = this.measuredMargin;
        }
      }
    }
  }

  /** Workaround for getter/setter pair not accepting different types. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static ngAcceptInputType_position: '' | 'start' | 'end';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static ngAcceptInputType_opened: BooleanInput;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static ngAcceptInputType_expanded: BooleanInput;
}
