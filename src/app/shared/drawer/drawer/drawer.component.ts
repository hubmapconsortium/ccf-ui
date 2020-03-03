import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output,
} from '@angular/core';

import { Drawer } from '../services/connector.service';


export type DrawerPosition = 'start' | 'end';
type OpenedState = 'closed' | 'open' | 'open-instant';
type ExpandedState = 'closed' | 'open' | 'open-instant';


@Component({
  selector: 'ccf-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('openClose', [
      state(`open, open-instant`, style({
        transform: 'none',
        visibility: 'visible'
      })),
      state('closed', style({
        visibility: 'hidden'
      })),

      transition('closed => open-instant', animate(0)),
      transition('closed <=> open, open-instant => closed', animate('1.5s'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements AfterViewInit, Drawer, OnDestroy {
  @HostBinding('class') readonly className = 'ccf-drawer';
  @HostBinding('class.ccf-drawer-end') // tslint:disable-line: no-unsafe-any
  get classEnd(): boolean { return this.position === 'end'; }

  @Input()// tslint:disable-line: no-unsafe-any
  get position(): DrawerPosition { return this._position; }
  set position(value: DrawerPosition) {
    // TODO
    this._position = value || 'start';
  }
  private _position: DrawerPosition = 'start';

  @Input() // tslint:disable-line: no-unsafe-any
  @HostBinding('class.ccf-drawer-opened') // tslint:disable-line: no-unsafe-any
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) { this.toggle(coerceBooleanProperty(value)); }
  private _opened = false;

  @Output() readonly openedChange = new EventEmitter<boolean>(true);

  @Input() // tslint:disable-line: no-unsafe-any
  @HostBinding('class.ccf-drawer-expanded') // tslint:disable-line: no-unsafe-any
  get expanded(): boolean { return this._expanded; }
  set expanded(value: boolean) { this.toggleExpanded(coerceBooleanProperty(value)); }
  private _expanded = false;

  @Output() readonly expandedChange = new EventEmitter<boolean>(true);

  @HostBinding('@openClose') openedState: OpenedState = 'closed';
  expandedState: ExpandedState = 'closed';
  stateChange = new EventEmitter<void>();
  private animationsEnabled = false;

  get measuredWidth(): number {
    if (this.expandedState !== 'closed') { return this._measuredWidth; }
    return this._measuredWidth = this.element.nativeElement?.offsetWidth ?? 0;
  }
  private _measuredWidth = 0;

  constructor(private element: ElementRef<HTMLElement>,
              private platform: Platform) { }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) { this.animationsEnabled = true; }
  }

  ngOnDestroy(): void {
    this.openedChange.complete();
    this.expandedChange.complete();
  }

  open(): void { this.toggle(true); }
  close(): void { this.toggle(false); }
  toggle(opened = !this.opened): void {
    if (opened) {
      this.openedState = this.animationsEnabled ? 'open' : 'open-instant';
    } else {
      this.openedState = 'closed';
    }

    this.stateChange.emit();
  }

  openExpanded(): void { this.toggleExpanded(true); }
  closeExpanded(): void { this.toggleExpanded(false); }
  toggleExpanded(expanded = !this.expanded): void {
    //
    this.stateChange.emit();
  }
}
