import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { Content } from '../services/connector.service';


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
export class ContentComponent implements Content {
  @HostBinding('class') readonly className = 'ccf-drawer-content';
  @HostBinding('class.ccf-drawer-content-animatable') animationsEnabled = false;
  @HostBinding('style.margin-left.px') leftMargin = 0;
  @HostBinding('style.margin-right.px') rightMargin = 0;
  @HostBinding('@fadeInOut') faded = false;
}
