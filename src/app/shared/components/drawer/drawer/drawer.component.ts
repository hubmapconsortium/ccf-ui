import { animate, state, style, transition, trigger } from '@angular/animations';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener,
  Input, OnDestroy, Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Message, MessageChannel, MessageService } from '../messages';


type OpenedState = 'open' | 'open-instant' | 'closed';
type ExpandedState = 'open' | 'open-instant' | 'closed';
type ExpandedState2 = 'collapsed' | 'half' | 'extended' | 'full';

const EXPAND_COLLAPSE_PARAMS_DEFAULT = {
  params: {
    width: 0,
    margin: 0
  }
};

class InitializationState {
  private initialized = false;
  private deferred = new Promise<void>(resolve => this.resolve = resolve);
  private resolve: () => void;

  set(): void {
    this.initialized = true;
    this.resolve();
  }

  async wait(): Promise<void> { return this.deferred; }
  valueOf(): boolean { return this.initialized; }
}


@Component({
  selector: 'ccf-drawer',
  exportAs: 'ccfDrawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('openClose', [
      state(`open, open-instant`, style({
        transform: 'none'
      })),
      state('closed', style({ })),

      transition('closed => open-instant', animate(0)),
      transition('closed <=> open, open-instant => closed', animate('1.5s ease-in-out'))
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
        width: 'calc(100% - {{ margin }}px)'
      }), EXPAND_COLLAPSE_PARAMS_DEFAULT),

      transition('* <=> *', animate('1.5s ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly className = 'ccf-drawer';
  @HostBinding('class.ccf-drawer-end') // tslint:disable-line: no-unsafe-any
  get classEnd(): boolean { return this.position === 'end'; }

  @Input()// tslint:disable-line: no-unsafe-any
  get position(): 'start' | 'end' { return this._position; }
  set position(value: 'start' | 'end') { this._position = value || 'start'; }
  private _position: 'start' | 'end' = 'start';

  @Input() // tslint:disable-line: no-unsafe-any
  @HostBinding('class.ccf-drawer-opened') // tslint:disable-line: no-unsafe-any
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) { this.toggle(coerceBooleanProperty(value)); }
  private _opened = false;

  @Input() // tslint:disable-line: no-unsafe-any
  @HostBinding('class.ccf-drawer-expanded') // tslint:disable-line: no-unsafe-any
  get expanded(): boolean { return this._expanded; }
  set expanded(value: boolean) { this.toggleExpanded(coerceBooleanProperty(value)); }
  private _expanded = false;

  @Output() readonly openedChange = new EventEmitter<boolean>(true);
  @Output() readonly expandedChange = new EventEmitter<boolean>(true);

  @HostBinding('@openClose')
  openedState: OpenedState = 'closed';

  @HostBinding('@expandCollapse')  // tslint:disable-line: no-unsafe-any
  get expandedStateObj(): unknown {
    return { value: this.expandedState2, params: {
      width: this.width, margin: this.measuredMargin
    }};
  }
  expandedState: ExpandedState = 'closed';
  private expandedState2: ExpandedState2 = 'collapsed';

  private get measuredWidth(): number {
    if (this._measuredWidth > 0) { return this._measuredWidth; }

    const element = this.element.nativeElement;
    if (!element) { return 0; }

    const bbox = element.getBoundingClientRect();
    const width = bbox.right - bbox.left;
    if (width === 0) { return 0; }

    return this._measuredWidth = width;
  }
  private _measuredWidth = 0;
  private width = 0;

  private get measuredMargin(): number {
    if (this._measuredMargin > 0) { return this._measuredMargin; }

    const element = this.element.nativeElement;
    if (!element) { return 0; }

    const styles = globalThis.getComputedStyle(element);
    const property = this.position === 'start' ? 'margin-right' : 'margin-left';
    const value = styles.getPropertyValue(property);
    const margin = Number(value.slice(0, -2));

    return this._measuredMargin = margin;
  }
  private _measuredMargin = 0;

  private initialized = new InitializationState();
  private channel: MessageChannel;
  private subscriptions = new Subscription();

  constructor(messageService: MessageService,
              cdr: ChangeDetectorRef,
              private element: ElementRef<HTMLElement>) {
    this.channel = messageService.connect(this);
    this.subscriptions.add(this.channel.getMessages().subscribe(msg => {
      if (this.handleMessage(msg)) { cdr.markForCheck(); }
    }));
  }

  ngAfterViewInit(): void {
    this.initialized.set();
    setTimeout(() => this.channel.sendMessage({ type: 'drawer-initialized' }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  open(): void { this.toggle(true); }
  close(): void { this.toggle(false); }
  toggle(opened = !this.opened): void {
    if (this.opened === opened) { return; }

    if (!opened) {
      this.openedState = 'closed';
      this.expandedState = 'closed';
      this.expandedState2 = 'collapsed';
      this._expanded = false;
    } else if (this.initialized) {
      this.openedState = 'open';
    } else {
      this.openedState = 'open-instant';
    }

    this._opened = opened;
    this.sendToggle();
  }

  openExpanded(): void { this.toggleExpanded(true); }
  closeExpanded(): void { this.toggleExpanded(false); }
  toggleExpanded(expanded = !this.expanded): void {
    if (this.expanded === expanded) { return; }

    if (!expanded) {
      this.expandedState = 'closed';
      this.expandedState2 = 'collapsed';
    } else if (this.initialized) {
      this.expandedState = 'open';
    } else {
      this.expandedState = 'open-instant';
    }

    this._expanded = expanded;
    this.sendToggle();
  }

  @HostListener('@openClose.done') // tslint:disable-line: no-unsafe-any
  closeOpenDone(): void {
    this.openedChange.emit(this.opened);
  }

  @HostListener('@expandCollapse.done') // tslint:disable-line: no-unsafe-any
  expandCollapseDone(): void {
    this.expandedChange.emit(this.expanded);
  }

  private async sendToggle(): Promise<void> {
    await this.initialized.wait();
    this.channel.sendMessage({
      type: 'drawer-toggled',
      opened: this.opened,
      expanded: this.expanded,
      width: this.measuredWidth,
      margin: this.measuredMargin
    });
  }

  private handleMessage(msg: Message): boolean {
    switch (msg.payload.type) {
      case 'drawer-toggled':
        const other = msg.source as DrawerComponent;
        this.syncExpanded(other);
        return true;

      default:
        return false;
    }
  }

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
        }
      } else {
        if (this.opened) {
          other.expandedState2 = 'extended';
          other.width = this.measuredWidth + this.measuredMargin;
        } else {
          other.expandedState2 = 'full';
        }
      }
    }
  }

  static ngAcceptInputType_position: '' | 'start' | 'end'; // tslint:disable-line: variable-name member-ordering
  static ngAcceptInputType_opened: BooleanInput; // tslint:disable-line: variable-name member-ordering
  static ngAcceptInputType_expanded: BooleanInput; // tslint:disable-line: variable-name member-ordering
}
