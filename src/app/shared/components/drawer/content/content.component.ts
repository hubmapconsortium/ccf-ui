import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageService } from '../messages';


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
  @HostBinding('class') readonly className = 'ccf-drawer-content';
  @HostBinding('class.cff-drawer-content-animations') animationsEnabled = false;
  @HostBinding('style.margin-left.px') leftMargin = 0;
  @HostBinding('style.margin-right.px') rightMargin = 0;
  @HostBinding('@fadeInOut') faded = false;

  private drawers: DrawerComponent[] = [];
  private subscriptions = new Subscription();

  constructor(messageService: MessageService,
              cdr: ChangeDetectorRef) {
    const messages = messageService.connect(this).getMessages();
    this.subscriptions.add(messages.subscribe(msg => {
      if(this.handleMessage(msg)) { cdr.markForCheck(); }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleMessage(msg: Message): boolean {
    switch (msg.payload.type) {
      case 'drawer-containers-changed':
        this.drawers = msg.payload.drawers as DrawerComponent[];
        this.updateFaded();
        return true;

      case 'drawer-initialized':
        this.animationsEnabled = true;
        return true;

      case 'drawer-toggled':
        const position = (msg.source as DrawerComponent).position;
        const { opened, width } = msg.payload;

        this.updateMargin(position, opened, width);
        this.updateFaded();
        return true;

      default:
        return false;
    }
  }

  private updateMargin(position: 'start' | 'end', opened: boolean, width: number): void {
    const margin = opened ? width : 0;
    if (position === 'start') {
      this.leftMargin = margin;
    } else {
      this.rightMargin = margin;
    }
  }

  private updateFaded(): void {
    setTimeout(() => {
      const [start, end] = this.drawers;
      const startExpanded = start?.opened && start?.expanded;
      const endExpanded = end?.opened && end?.expanded;
      this.faded = startExpanded || endExpanded;
    });
  }
}
