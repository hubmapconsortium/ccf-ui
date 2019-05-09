import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { get as loGet, toPairs as loToPairs } from 'lodash';

import { TissueImage } from '../../shared/state/database/database.models';

/**
 * Contains the content of the tissues browser grid's popover.
 */
@Component({
  selector: 'ccf-tissues-browser-grid-popover-content',
  templateUrl: './tissues-browser-grid-popover-content.component.html',
  styleUrls: ['./tissues-browser-grid-popover-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridPopoverContentComponent {
  /**
   * The ontology node for which to display meta data.
   */
  @Input() item: TissueImage;

  /**
   * Age in whole years.
   */
  get age(): string {
    return String(loGet(this.item, ['slice', 'sample', 'patient', 'age'], '??'));
  }

  /**
   * Gender - male/female/undefined.
   */
  get genderIcon(): string {
    return 'gender:' + loGet(this.item, ['slice', 'sample', 'patient', 'gender'], 'undefined');
  }

  /**
   * Meta data to display.
   */
  get metadata(): [string, any][] {
    return loToPairs(loGet(this.item, 'thumbnailMetadata', { }));
  }

  /**
   * Tracks a meta data tuple by its label.
   *
   * @param data Meta data tuple.
   * @returns The label of the meta data.
   */
  trackByLabel(metadata: [string, any]): string {
    return metadata[0];
  }
}
