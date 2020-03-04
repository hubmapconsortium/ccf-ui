import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';

import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageService } from '../messages';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ccf-drawer-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly className = 'ccf-drawer-toggle-button';
  @HostBinding('class.ccf-drawer-toggle-button-end') // tslint:disable-line: no-unsafe-any
  get classEnd(): boolean { return this.position === 'end'; }

  get icon(): string {
    let expand = 'keyboard_arrow_right';
    let collapse = 'keyboard_arrow_left';
    if (this.position === 'end') { ([expand, collapse] = [collapse, expand]); }

    return this.opened ? collapse : expand;
  }

  private position: 'start' | 'end' = 'start';
  private opened = false;
  private subscriptions = new Subscription();

  constructor(private drawer: DrawerComponent,
              messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    const channel = messageService.connect(this);
    this.subscriptions.add(channel.getMessagesFromSource(drawer).subscribe(msg => {
      if (this.handleMessage(msg)) { cdr.markForCheck(); }
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.position = this.drawer.position;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleMessage(msg: Message): boolean {
    if (msg.payload.type === 'drawer-toggled') {
      this.opened = msg.payload.opened;
      return true;
    }

    return false;
  }

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
