import { Immutable } from '@angular-ru/common/typings/immutability';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AggregateResult } from 'ccf-database';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ListResult } from '../../../core/models/list-result';


/**
 * ResultsBrowser is the container component in charge of rendering the label and stats of
 * the results as well as handling the virtual scrolling and click emitters of
 * ResultsBrowserItems.
 */
@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsBrowserComponent {
  /**
   * Input array of List Results to display
   */
  @Input() listResults!: Immutable<ListResult[]>;

  /**
   * Input used to add a list of stats at the top the results browser
   */
  @Input() aggregateData!: Immutable<AggregateResult[]>;

  /**
   * Input allowing the title of the result browser to be set outside of the component
   */
  @Input() resultLabel!: string;

  @Input() highlighted!: string;

  @Input() header!: boolean;

  /**
   * Output emitting the result that was clicked on and its relevant information.
   * Used for opening and rendering the result viewer.
   */
  @Output() readonly linkClicked = new EventEmitter<string>();

  /**
   * Output emitting the link result selected
   */
  @Output() readonly listResultSelected = new EventEmitter<Immutable<ListResult>>();

  /**
   * Output emitting the link result deselected
   */
  @Output() readonly listResultDeselected = new EventEmitter<Immutable<ListResult>>();

  @Output() readonly itemHovered = new EventEmitter<string>();

  @Output() readonly itemUnhovered = new EventEmitter();

  /**
   * Keeps track of whether or not the virtual scroll viewport is scrolled all the way to the bottom.
   * Used to determine whether or not to render the gradient at the bottom.
   */
  atScrollBottom = false;

  /**
   * Creates an instance of results browser component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Notifies listeners when a selection/deselection is made
   *
   * @param result the list result
   * @param selected whether to select or deselect the result
   */
  handleSelection(result: Immutable<ListResult>, selected: boolean): void {
    this.ga.event('list_result_selected', 'results_browser', this.resultLabel, +selected);
    if (selected) {
      this.listResultSelected.next(result);
    } else {
      this.listResultDeselected.next(result);
    }
  }

  /**
   * Notifies on link click
   *
   * @param link the link clicked
   */
  handleLinkClick(link: string): void {
    this.linkClicked.emit(link);
  }

  /**
   * Handles the scroll event to detect when scroll is at the bottom.
   *
   * @param event The scroll event.
   */
  onScroll(event: Event): void {
    if (!event.target) {
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = event.target as Element;
    const diff = scrollHeight - scrollTop - clientHeight;
    this.atScrollBottom = diff < 64;
  }

  handleHover(id: string): void {
    this.itemHovered.emit(id);
  }

  handleUnhover(): void {
    this.itemUnhovered.emit();
  }

  asMutable<T>(value: Immutable<T>): T {
    return value as T;
  }
}
