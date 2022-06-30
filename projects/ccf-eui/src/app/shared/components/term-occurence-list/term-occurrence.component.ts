import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'ccf-term-occurrence-list',
  templateUrl: './term-occurrence.component.html',
  styleUrls: ['./term-occurrence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermOccurrenceListComponent {

  @Input() termList: TermResult[];

}
