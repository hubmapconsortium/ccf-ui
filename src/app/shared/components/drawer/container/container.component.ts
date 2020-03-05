import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, HostBinding, OnDestroy, QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { ContentComponent } from '../content/content.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { Message, MessageChannel, MessageService } from '../messages';


function throwDuplicateDrawersError(position: 'start' | 'end'): never {
  throw new Error(`Multiple drawers in position ${position}`);
}


@Component({
  selector: 'ccf-drawer-container',
  exportAs: 'ccfDrawerContainer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly className = 'ccf-drawer-container';

  @ContentChildren(DrawerComponent, { descendants: true })
  private drawers: QueryList<DrawerComponent>;

  @ContentChildren(ContentComponent, { descendants: true })
  private content1: QueryList<ContentComponent>;
  @ViewChildren(ContentComponent)
  private content2: QueryList<ContentComponent>;
  private get content(): ContentComponent {
    return this.content1.first ?? this.content2.first;
  }

  get hasWrappedContent(): boolean { return this.content1.length !== 0; }

  private channel: MessageChannel;
  private subscriptions = new Subscription();

  constructor(messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    this.channel = messageService.connect(this);
    this.subscriptions.add(this.channel.getMessages().subscribe(msg => {
      if (this.handleMessage(msg)) { cdr.markForCheck(); }
    }));
  }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleMessage(_msg: Message): boolean {
    return true;
  }

  private validateDrawers(): [DrawerComponent | undefined, DrawerComponent | undefined] {
    const drawers = this.drawers.toArray();
    const startDrawers = drawers.filter(drawer => drawer.position === 'start');
    const endDrawers = drawers.filter(drawer => drawer.position === 'end');

    if (startDrawers.length > 1) { throwDuplicateDrawersError('start'); }
    if (endDrawers.length > 1) { throwDuplicateDrawersError('end'); }

    return [startDrawers[0], endDrawers[0]];
  }
}
