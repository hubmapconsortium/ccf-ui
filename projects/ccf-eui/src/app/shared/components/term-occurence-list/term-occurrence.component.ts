import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
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
  /**
   * Updates the selected value.
   *
   * @param value The value that has been selected
   */
  selectionChanged(): void {
    console.log('test');
  }

  ngOnInit(): void {

    this.populateList();
  }

  populateList(): void {
    let i = 0;
    while (i < 29) {
      const theTerm: TermResult = {
        '@id': 'id' + i,
        label: 'Eggs' + i,
        count: 8 + i
      };
      i++;
      this.termList.push(theTerm);
    }
  }
}
