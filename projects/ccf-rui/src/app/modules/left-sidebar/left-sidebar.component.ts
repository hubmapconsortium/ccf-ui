import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VisibilityItem } from '../../core/models/visibility-item';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { RUI_ORGANS } from './../../core/store/model/model.state';


/**
 * The left sidebar
 */
@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-left-sidebar';

  /** Whether or not the initial registration modal has been closed */
  @Input() modalClosed = false;

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === undefined ? false : true)
  );

  /**
   * Variable that keeps track of the extraction site tooltip to display on
   * the stage when hovered.
   */
  extractionSiteTooltip = '';

  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    readonly registration: RegistrationState
  ) { }

  /**
   * Updates extraction site tooltip to either the VisibilityItem passed in's
   * tooltip property, or an empty string if undefined.
   *
   * @param item The VisibilityItem which we want to show the tooltip of, or
   * undefined.
   */
  updateExtractionSiteTooltip(item: VisibilityItem | undefined): void {
    if (item?.tooltip) {
      this.extractionSiteTooltip = item.tooltip;
    } else {
      this.extractionSiteTooltip = '';
    }
  }
}
