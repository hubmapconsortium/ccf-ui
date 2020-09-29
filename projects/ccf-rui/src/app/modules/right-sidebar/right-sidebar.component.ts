import { ChangeDetectionStrategy, Component, HostBinding, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ModelState } from '../../core/store/model/model.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { PageState } from '../../core/store/page/page.state';

import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent implements AfterViewInit {
  /** HTML class name */
  @HostBinding('class') clsName = 'ccf-right-sidebar';

  readonly placeholderTags = [
    { tag: 'calyces' },
    { tag: 'capsule' },
    { tag: 'medulla' },
    { tag: 'outer cortex' },
    { tag: 'papilla' },
    { tag: 'pyramids' },
    { tag: 'renal', color: '#992661' }
  ];

  /**
   * Sensor for detecting changes in size of an element
   */
  private sensor: ResizeSensor;

  /**
   * Determines if scrollbar is active;
   */
  scrollbarOn = false;

  /**
   * Creates an instance of right sidebar component.
   *
   * @param model Model state service
   * @param registration Registration state service
   * @param page The page state
   * @param cdr Change detector
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * ResizeSensor senses changes in sidebar container height and sets scrollbarOn to true if greater than drawer height
   */
  ngAfterViewInit(): void {
    const container = document.getElementsByClassName('container')[1] as HTMLElement;
    const drawer = document.getElementsByClassName('ccf-drawer')[1] as HTMLElement;
    const drawerHeight = parseInt(getComputedStyle(drawer).height, 10);
    this.sensor = new ResizeSensor(container, () => {
      const containerHeight = parseInt(getComputedStyle(container).height, 10);
      this.scrollbarOn = containerHeight > drawerHeight ? true : false;
      this.clsName = this.scrollbarOn ? 'ccf-right-sidebar scroll' : 'ccf-right-sidebar';
      this.cdr.detectChanges();
    });
  }

  fakeAutocomplete(): unknown {
    return [[
      {
        id: 1,
        label: 'foo',
        decorations: [{
          styles: {
            'text-decoration': 'underline'
          }
        }]
      },
      {
        id: 2,
        label: 'bar'
      }
    ]];
  }
}
