import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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

  /**
   * Updates the selected value.
   *
   * @param value The value that has been selected
   */
  selectionChanged(): void {
    console.log('test');
  }
}
