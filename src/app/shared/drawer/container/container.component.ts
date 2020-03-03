import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, HostBinding, QueryList,
  ViewChildren,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ContentComponent } from '../content/content.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { ConnectorService, Container, Content, Drawer } from '../services/connector.service';


@Component({
  selector: 'ccf-drawer-container',
  exportAs: 'ccfDrawerContainer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [ConnectorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements AfterViewInit, Container {
  @HostBinding('class') readonly className = 'ccf-drawer-container';

  @ContentChildren(DrawerComponent, { descendants: true })
  private drawersQueryList: QueryList<DrawerComponent>;
  get drawers(): Observable<Drawer[]> {
    return this.combineQueryLists([this.drawersQueryList]);
  }

  @ContentChildren(ContentComponent, { descendants: true })
  private contentQueryList1: QueryList<ContentComponent>;
  @ViewChildren(ContentComponent)
  private contentQueryList2: QueryList<ContentComponent>;
  get content(): Observable<Content> {
    return this.combineQueryLists([this.contentQueryList1, this.contentQueryList2]).pipe(
      map(values => values.find(value => !!value) as Content)
    );
  }

  get hasWrappedContent(): boolean { return this.contentQueryList1.length !== 0; }

  constructor(public cdr: ChangeDetectorRef,
              private connector: ConnectorService) {
    console.log(this);
  }

  ngAfterViewInit(): void {
    this.connector.attach(this);
  }

  private combineQueryLists<T>(lists: QueryList<T>[]): Observable<T[]> {
    function fetch(): T[] {
      const values = lists.map(list => list.toArray());
      return ([] as T[]).concat(...values);
    }

    const changes = lists.map(list => list.changes);
    return combineLatest(changes).pipe(
      map(fetch),
      startWith(fetch())
    );
  }
}
