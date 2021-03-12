import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AggregateResult, ListResult } from 'ccf-database';
import { TissueBlockResult } from '../../../core/models/tissue-block-result';


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
export class ResultsBrowserComponent implements OnInit {

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
   * Keeps track of whether or not the virtual scroll viewport is scrolled all the way to the bottom.
   * Used to determine whether or not to render the gradient at the bottom.
   */
  atScrollBottom = false;

  /**
   * Keeps track of the selected result for highlighting
   */
  selectedResult: ListResult;

  /**
   * Placeholder data for donor card component
   * */
  sampleDonor: TissueBlockResult = {
    '@id': '4321',
    '@type': 'Sample',
    label: '',
    description: '',
    link: '',
    sampleType: 'Tissue Block',
    sectionCount: 2,
    sectionSize: 10,
    sectionUnits: 'um',
    ruiLocationId: '121',
    donor: {
      '@id': '12',
      '@type': 'Donor',
      link: 'www.google.com',
      label: 'Female, Age 38, BMI 14.7',
      description: 'Entered 1/21/2021, Hom Sim, VU'
    },
    datasets: [
      {
        '@id': '432',
        '@type': 'Dataset',
        link: 'www.google.com',
        thumbnail: '',
        technology: '',
        label: 'Registered 1/3/2021, Hom Sim, VU',
        description: '1 x 1.2 x 3mm, 10um, Flash Frozen, 4 Sections'
      }
    ],
    sections: [
      {
        '@id': '321',
        '@type': 'Sample',
        label: '',
        description: '',
        link: '',
        sampleType: 'Tissue Section',
        sectionNumber: 1,
        datasets: []
      }
    ]
  }
  donorData: TissueBlockResult[] = [];

  ngOnInit(): void {
    let tempDonorA: TissueBlockResult;
    let tempDonorB: TissueBlockResult;
    for (let i = 1; i <= 15; i++) {
      tempDonorA = {...this.sampleDonor, '@id': i.toString(), ruiLocationId: i.toString() }
      tempDonorB = {...tempDonorA, '@id': (i*100).toString() };
      this.donorData.push(tempDonorA);
      this.donorData.push(tempDonorB);
    }

    console.log('donors: ', this.donorData);
  }

  handleDonorCardSelection($event: boolean, donor: TissueBlockResult): void {
    // Will call results state method to update selections / colors.
  }

  getTissueBlockColor(ruiLocationId: string): string {
    // Will get colors from results state.
    return 'blue';
  }

  isTissueBlockSelected(block: TissueBlockResult): boolean {
    // Will get selected state from results state.
    return false;
  }

  /**
   * Handles the scroll event to detect when scroll is at the bottom.
   *
   * @param event The scroll event.
   */
  onScroll(event: UIEvent): void {
    if (!event.target) {
      return;
    }

    const { clientHeight, scrollHeight, scrollTop } = event.target as Element;
    const diff = scrollHeight - scrollTop - clientHeight;
    this.atScrollBottom = diff < 64;
  }
}
