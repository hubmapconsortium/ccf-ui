import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AggregateResult, ListResult } from 'ccf-database';
import { TissueBlockResult } from '../../../core/models/tissue-block-result';

interface ColorSwatch {
  color: string;
  available: boolean;
  '@id': string;
}

type ColorPalette = ColorSwatch[];

interface TissueBlockRegistryEntry {
  '@id': string;
  ruiLocationId: string;
  color: string;
}

type TissueBlockRegistry = TissueBlockRegistryEntry[];

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



  donorColorPalette: ColorPalette = [
    { available: true, color: 'blue' },
    { available: true, color: 'pink' },
    { available: true, color: 'orange' },
    { available: true, color: 'green' },
  ];



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
  tissueBlockRegistry: TissueBlockRegistry = [];

  test = {
    "@id": "iri",
    "@type": "Donor",
    "label": "blah",
    "description": "blah blah",
    "link": "http://datadata",
    "age": 123,
    "sex": "Male",
    "bmi": 30.0,
    "consortium_name": "HuBMAP",
    "provider_name": "MC-IU",
    "provider_uuid": "1224",
    "samples": [{
      "@id": "iri",
      "@type": "Sample",
      "label": "blah",
      "description": "blah blah",
      "link": "http://datadata",
      "sample_type": "Tissue Block",
      "section_count": 10,
      "section_size": 10,
      "section_units": "um",
      "rui_location": {
        "@id": "iri",
        "@type": "SpatialEntity",
        "creation_date": "124",
        "ccf_annotations": []
      },
      "samples": [{
        "@id": "iri",
        "@type": "Sample",
        "label": "blah",
        "description": "blah blah",
        "link": "http://datadata",
        "sample_type": "Tissue Section",
        "section_number": 1,
        "datasets": []
      }],
      "datasets": [{
        "@id": "iri",
        "@type": "Dataset",
        "label": "blah",
        "description": "blah blah",
        "technology": "AF",
        "thumbnail": "http://example.com",
        "link": "http://datadata"
      }]
    }]
  }

  ngOnInit(): void {
    let tempDonorA: TissueBlockResult;
    let tempDonorB: TissueBlockResult;
    let donor;
    for (let i = 0; i <= 15; i++) {
      donor = {
        label: `(ID: ${i})Female, Age 38, BMI 14.7`,
        description: 'Entered 1/21/2021, Hom Sim, VU',
        link: 'www.google.com'
      }
      tempDonorA = {...this.sampleDonor, donor};
      tempDonorB = {...tempDonorA};
      this.donorData.push(tempDonorA);
      this.donorData.push(tempDonorB);
    }
  }

  getAvailableColor(): string {
    let availableColors = this.donorColorPalette.filter(color => color.available);
    if (availableColors.length) {
      return availableColors[0].color;
    }

    // @TODO:  remove test code
    const before = this.tissueBlockRegistry
    const color = this.tissueBlockRegistry.shift()?.color || '';
    // pop oldest selection from registry
    // return color of popped selection
    return '';
  }

  setColorAvailability(color: string, available: boolean): void {
    if (!this.donorColorPalette.find(tColor => tColor.color === color)) {
      return;
    }

    this.donorColorPalette.find(tColor => tColor.color === color)!.available = available;
  }


  handleDonorCardSelection($event: boolean, donor: TissueBlockResult): void {
    const selected = $event;
    // same rui_location_id = same color.
    if (selected) {
      const newColor = this.getAvailableColor();
      this.setTissueBlockColor(donor, this.getAvailableColor());
      this.setColorAvailability(newColor, false);
    } else {
      this.setColorAvailability(this.getTissueBlockColor(donor), true);
    }
  }

  getTissueBlockColor(tissueBlock: TissueBlockResult): string {
    return this.tissueBlockRegistry.find(block => block.id === tissueBlock.ruiLocationId)?.color || '';
  }

  setTissueBlockColor(tissueBlock: TissueBlockResult, color?: string): void {
    this.tissueBlockRegistry.push({
      color: color ? color : this.getAvailableColor(),
      id: tissueBlock['@id']
    });
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
