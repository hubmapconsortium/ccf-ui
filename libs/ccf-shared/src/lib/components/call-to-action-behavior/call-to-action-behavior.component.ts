import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';

import {
  CloseDialog,
  LearnMore,
} from '../../states/call-to-action/call-to-action.actions';
import { CallToActionSelectors } from '../../states/call-to-action/call-to-action.selectors';

/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-call-to-action-behavior',
  templateUrl: './call-to-action-behavior.component.html',
  styleUrls: ['./call-to-action-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallToActionBehaviorComponent {
  @Select(CallToActionSelectors.title)
  readonly title$!: Observable<string>;

  @Select(CallToActionSelectors.message)
  readonly message$!: Observable<string>;

  @Select(CallToActionSelectors.callToAction)
  readonly callToAction$!: Observable<string>;

  @Select(CallToActionSelectors.imageUrl)
  readonly imageUrl$!: Observable<string>;

  /**
   * Closes dialog
   */
  @Dispatch()
  readonly close = (): CloseDialog => new CloseDialog();

  /**
   * Sends learn more open action
   * @returns LearnMore action
   */
  @Dispatch()
  readonly learnMore = (): LearnMore => new LearnMore();
}
