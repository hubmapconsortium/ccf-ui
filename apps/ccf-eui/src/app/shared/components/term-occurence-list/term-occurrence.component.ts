import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

/**
 * Component for a dropdown menu
 */
@Component({
  selector: 'ccf-term-occurrence-list',
  templateUrl: './term-occurrence.component.html',
  styleUrls: ['./term-occurrence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermOccurrenceListComponent {
  @HostBinding('class') readonly className = 'ccf-term-occurrence-list';

  /**
   * array that contains the terms and their counts
   */
  @Input() termList: TermResult[] = [];

  /**
   * Holds title for section
   */
  @Input() title: string;

  /**
   * Text to be included in the tool tip
   */
  @Input() toolTipText: string;
}
