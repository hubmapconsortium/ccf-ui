import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AggregateResult, ListResult } from 'ccf-database';
import { TissueBlockResult } from '../../../core/models/tissue-block-result';

interface ColorSwatch {
  color: string;
  available: boolean;
  ruiLocationId: string;
}

type ColorPalette = ColorSwatch[];

interface TissueBlockRegistryEntry {
  tissueBlockId: string;
  ruiLocationId: string;
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
    { available: true, color: 'blue', ruiLocationId: '' },
    { available: true, color: 'pink', ruiLocationId: ''  },
    { available: true, color: 'orange', ruiLocationId: ''  },
    { available: true, color: 'green', ruiLocationId: ''  },
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
    for (let i = 1; i <= 15; i++) {
      tempDonorA = {...this.sampleDonor, '@id': i.toString(), ruiLocationId: i.toString() }
      tempDonorB = {...tempDonorA, '@id': (i*100).toString() };
      this.donorData.push(tempDonorA);
      this.donorData.push(tempDonorB);
    }

    console.log('donors: ', this.donorData);
  }

  getNextColor(ruiLocationId?: string): string {
    // If ruiLocationId is passed in, check first if there is already a color assigned to it.
    if (ruiLocationId) {
      if (this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)) {
        return this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)!.color;
      }
    }

    const availableColors = this.donorColorPalette.filter(color => !!color.available);
    let newColor: string;

    if (availableColors.length > 0) {
      newColor = availableColors[0].color;
      this.donorColorPalette.find(color => color.color === newColor)!.available = false;
      return newColor;
    }

    // If there are no available colors, we need to make one available.
    return this.recycleOldestColor();
  }

  recycleOldestColor(): string {
    // Should not be recycling colors if none are currently selected.
    if (this.tissueBlockRegistry.length >= 0) {
      return '';
    }
    const registryCopy = [...this.tissueBlockRegistry];
    const oldestRuiLocation = registryCopy[0].ruiLocationId;
    const oldColor = this.getTissueBlockColor(oldestRuiLocation);

    // Remove all registry entries that have the same RUI location ID.
    registryCopy.forEach((entry, index) => {
      if (entry.ruiLocationId === oldestRuiLocation) {
        registryCopy.splice(index, 1);
      }
    });

    this.tissueBlockRegistry = registryCopy;
    return oldColor;
  }

  setColorAvailability(color: string, available: boolean): void {
    if (!this.donorColorPalette.find(tColor => tColor.color === color)) {
      return;
    }

    this.donorColorPalette.find(tempColor => tempColor.color === color)!.available = available;
  }

  useColor(color: string, ruiLocationId): void {
    if (!this.donorColorPalette.find(tempColor => tempColor.color === color)) {
      return;
    }

    this.donorColorPalette.find(tempColor => tempColor.color === color)!.ruiLocationId = ruiLocationId;
    this.donorColorPalette.find(tempColor => tempColor.color === color)!.available = false;
  }


  handleDonorCardSelection($event: boolean, donor: TissueBlockResult): void {
    const selected = $event;

    if (selected) {
      const newColor = this.getNextColor();
      this.selectTissueBlock(donor, this.getNextColor());
      this.setColorAvailability(newColor, false);
    } else {
      this.setColorAvailability(this.getTissueBlockColor(donor.ruiLocationId), true);
    }
  }

  getTissueBlockColor(ruiLocationId: string): string {
    return this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)?.color || '';
  }

  isTissueBlockSelected(block: TissueBlockResult): boolean {
    if (this.tissueBlockRegistry.find(tissueBlock => tissueBlock['@id'] === block['@id'])) {
      return true;
    }

    return false;
  }

  selectTissueBlock(tissueBlock: TissueBlockResult, color?: string): void {
    this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], ruiLocationId: tissueBlock.ruiLocationId });

    if (color) {
      if (this.donorColorPalette.find(tempColor => tempColor.color === color)) {
        this.useColor(this.donorColorPalette.find(tempColor => tempColor.color === color)!.color, tissueBlock.ruiLocationId);
      }
    }

    if (this.donorColorPalette.find(color => color.ruiLocationId === tissueBlock.ruiLocationId)) {
      return;
    }

    this.useColor(this.getNextColor(), tissueBlock.ruiLocationId);
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
