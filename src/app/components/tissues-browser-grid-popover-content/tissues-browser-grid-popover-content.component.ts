import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { get as loGet } from 'lodash';

import { OntologyNode } from '../../shared/state/ontology/ontology.model';

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
  @Input() item: OntologyNode;

  /**
   * Age in whole years.
   */
  get age(): string {
    return String(loGet(this.item, 'age', '??'));
  }

  /**
   * Gender - male/female/unknown.
   */
  get genderIcon(): string {
    return 'gender:' + loGet(this.item, 'gender', 'unknown');
  }

  /**
   * Meta data to display.
   */
  get data(): [string, any][] {
    return loGet(this.item, 'metadata', []);
  }

  /**
   * Tracks a meta data tuple by its label.
   *
   * @param data Meta data tuple.
   * @returns The label of the meta data.
   */
  trackByLabel(data: [string, any]): string {
    return data[0];
  }
}
