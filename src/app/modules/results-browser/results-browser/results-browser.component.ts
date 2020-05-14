import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AggregateResult, ListResult } from 'ccf-database';


/**
 * ResultsBrowser is the container component in charge of rendering the label and stats of
 * the results as well as handling the virtual scrolling and click emitters of
 * ResultsBrowserItems.
 */
@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss']
})
export class ResultsBrowserComponent implements AfterViewInit, OnChanges {

  /**
   * Input array of items used to generate the list of results in the results browser.
   */
  @Input() data: ListResult[];

  /**
   * Input used to add a list of stats at the top the results browser.
   */
  @Input() aggregateData: AggregateResult[];

  /**
   * Input allowing the title of the result browser to be set outside of the component.
   */
  @Input() resultLabel: string;

  /**
   * Whether or not the state is currently loading in data.
   */
  @Input() dataLoading: boolean;

  /**
   * Output emitting the result that was clicked on and its relevant information.
   * Used for opening and rendering the result viewer.
   */
  @Output() resultClicked = new EventEmitter<ListResult>();

  /**
   * Linking the virtual scroll viewport in the html page to the ts page.
   */
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  /**
   * Keeps track of whether or not the virtual scroll viewport is scrolled all the way to the bottom.
   * Used to determine whether or not to render the gradient at the bottom.
   */
  atScrollBottom = false;

  /**
   * Re-Checks whether or not we need the gradient to be displayed everytime the data reloads.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataLoading && !this.dataLoading) {
      this.atScrollBottom = this.virtualScroll.measureScrollOffset('bottom') === 0;
    }
  }

  /**
   * After the view is initialized this is listening for scroll events to check whether or not the
   * user has reached the bottom of the virtual scroll viewport to properly display / hide the
   * gradient at the bottom.
   */
  ngAfterViewInit() {
    this.virtualScroll.elementScrolled()
      .subscribe(event => {
        if (this.virtualScroll.measureScrollOffset('bottom') === 0) {
          this.atScrollBottom = true;
        } else {
          this.atScrollBottom = false;
        }
      });
  }
}
