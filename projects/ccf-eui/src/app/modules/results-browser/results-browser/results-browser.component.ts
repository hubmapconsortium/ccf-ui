import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AggregateResult, ListResult, TissueBlockResult } from 'ccf-database';

/**
 * WIP / Placeholder.
 * Throwing in current (non-fully functional) code that I've torn out of results-browser
 */
// @TODO:  selected tissueBlocks need to be pulled to the top of the list while selected.
interface ColorSwatch {
  color: string;
  ruiLocationId: string;
}
type ColorPalette = ColorSwatch[];

interface TissueBlockRegistryEntry {
  tissueBlockId: string;
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
   * Keeping this separate so that we can switch back to the old data if need be more easily.
   */
  @Input() data: ListResult[];

  /**
   * Input array of Tissue Blocks to pass along to the donor card component.
   */
  @Input() tissueBlockData: TissueBlockResult[];

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

  paletteColors = [
    '#FF8800',
    '#2979ff',
    '#ffd740',
    '#b92dff',
    '#da326f',
    '#7323e2',
    '#acf32b',
    '#82B1FF',
    '#E040FB',
    '#00E5FF',
  ];

  /**
   * All colors in the palette
   */
  allColors: string[] = [...this.paletteColors];

  /**
   * Palette colors that can currently be used
   */
  availableColors: string[] = [...this.paletteColors];

  /**
   * Keeps track of whether or not the virtual scroll viewport is scrolled all the way to the bottom.
   * Used to determine whether or not to render the gradient at the bottom.
   */
  atScrollBottom = false;

  /**
   * Keeps track of the selected result for highlighting
   */
  selectedResult: ListResult;

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

  donorColorPalette: ColorPalette = [];

  /**
   * Contains RUI locations of selected tissue blocks
   */
  selectedRUIs: string[] = [];

  /**
   * Keeps track of tissue blocks selected
   */
  tissueBlockRegistry: TissueBlockRegistry = [];

  ngOnInit(): void {
    for (const i in this.allColors) {
      const colorSwatch = {color: this.allColors[i], ruiLocationId: ''};
      this.donorColorPalette.push(colorSwatch);
    }
    let tempDonorA: TissueBlockResult;
    let tempDonorB: TissueBlockResult;
    for (let i = 1; i <= 15; i++) {
      tempDonorA = {...this.sampleDonor, '@id': i.toString(), ruiLocationId: i.toString() }
      tempDonorB = {...tempDonorA, '@id': (i*100).toString() };
      this.donorData.push(tempDonorA);
      this.donorData.push(tempDonorB);
    }
  }
  
  // Will call results state method to update selections / colors.
  handleDonorCardSelection($event: boolean, donor: TissueBlockResult): void {
    const selected = $event;
    if (selected) {
      this.selectTissueBlock(donor);
    } else {
      this.deselectTissueBlock(donor);
    }
  }

  // Will get colors from results state.
  getTissueBlockColor(ruiLocationId: string): string {
    return this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)?.color || '';
  }

  // Will get selected state from results state.
  isTissueBlockSelected(block: TissueBlockResult): boolean {
    return this.tissueBlockRegistry.find(tissueBlock => tissueBlock.tissueBlockId === block['@id']) ? true : false;
  }

  selectTissueBlock(tissueBlock: TissueBlockResult): void {
    let availableColor: string;
    // If the block's rui location has already been selected, assign the color of the block to the color assigned to the rui location
    if (this.selectedRUIs.find(url => url === tissueBlock.ruiLocationId)) {
      // Find the color assigned to the rui location
      const newColor = this.donorColorPalette.find(colorSwatch => colorSwatch.ruiLocationId === tissueBlock.ruiLocationId)!.color;
      // Assign the color to the block and add block to tissueBlockRegistry
      this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], ruiLocationId: tissueBlock.ruiLocationId, color: newColor});
      return;
    // Otherwise we need to assign the next available color.
    } else {
      // If there are no more colors left and selected tissue block does not share a rui location with another selected block
      if (this.availableColors.length === 0 && !this.selectedRUIs.includes(tissueBlock.ruiLocationId)) {
        // make the available color the oldest color
        availableColor = this.recycleOldestColor(tissueBlock.ruiLocationId);
      } else {
        // Add new ruiLocation to selectedRUIs
        this.selectedRUIs.push(tissueBlock.ruiLocationId);
        // Get first available color and remove it from the available colors list
        availableColor = this.availableColors.shift()!;
      }
      // Update appropriate color in donorColorPalette with new ruiLocation
      this.updateColorWithLocation(availableColor, tissueBlock.ruiLocationId);
      // Find the color assigned to the rui location
      const newColor = this.donorColorPalette.find(colorSwatch => colorSwatch.ruiLocationId === tissueBlock.ruiLocationId)!.color;
      // Assign the color to the block and add block to tissueBlockRegistry
      this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], ruiLocationId: tissueBlock.ruiLocationId, color: newColor});
    }
  }

  deselectTissueBlock(tissueBlock: TissueBlockResult): void {
    const sorter = (a: string, b: string) => {
      const allColors = this.allColors;
      if(allColors.indexOf(a) > allColors.indexOf(b)) {
         return 1;
      };
      if(allColors.indexOf(a) < allColors.indexOf(b)){
         return -1;
      };
      return 0;
    };
    // If tissue block is not in the registry then do nothing
    if (!this.tissueBlockRegistry.find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])) {
      return;
    }
    const blockColor = this.donorColorPalette.find(colorSwatch => colorSwatch.ruiLocationId === tissueBlock.ruiLocationId)!.color;
    // Otherwise, remove tissue block from the registry
    const blockIndex = this.tissueBlockRegistry.indexOf(this.tissueBlockRegistry.find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])!);
    this.tissueBlockRegistry.splice(blockIndex, 1);
    // If removed block's color is still being used, do nothing
    if (this.tissueBlockRegistry.find((tBlock) => tBlock.ruiLocationId === tissueBlock.ruiLocationId)) {
      return;
    }
    // Otherwise, add the color to available colors, remove ruiLocation from selectedRUIs, and clear ruiLocation for that color in donorColorPalette
    this.availableColors.push(blockColor);
    this.availableColors.sort(sorter);
    this.selectedRUIs.splice(this.selectedRUIs.indexOf(tissueBlock.ruiLocationId))
    this.updateColorWithLocation(blockColor, '');
  }

  /**
   * Updates the RUI location assigned to a color in the palette
   * @param color The color to assign a location to
   * @param newLocation The new RUI location
   */
  updateColorWithLocation(color: string, newLocation: string): void {
    let paletteCopy = [...this.donorColorPalette];
    paletteCopy.find(tempColor => tempColor.color === color)!.ruiLocationId = newLocation;
    this.donorColorPalette = paletteCopy;
  }

  /**
   * Recycles oldest color when all colors in the palette have been used
   * @param newRuiLocation the RUI location of the latestblock
   * @returns oldest color
   */
  recycleOldestColor(newRuiLocation: string): string {
    // Should not be recycling colors if none are currently selected.
    if (this.tissueBlockRegistry.length <= 0) {
      return '';
    }
    const registryCopy: TissueBlockRegistry = [];
    const oldestRuiLocation = this.tissueBlockRegistry[0].ruiLocationId;
    const oldColor = this.getTissueBlockColor(oldestRuiLocation);
    // Remove all registry entries that have the same RUI location ID; update selectedRUIs to remove the old RUI location
    this.tissueBlockRegistry.forEach((entry: TissueBlockRegistryEntry) => {
      if (entry.ruiLocationId !== oldestRuiLocation) {
        this.selectedRUIs = this.selectedRUIs.filter(rui => rui !== oldestRuiLocation);
        registryCopy.push(entry);
      }
    });
    this.selectedRUIs.push(newRuiLocation)
    this.tissueBlockRegistry = registryCopy;
    return oldColor;
  }

  // highlightTissueBlock(tissueBlock: TissueBlockResult): void {
  //   let availableColor: string;
  //   // If the block's rui location has already been selected, assign the color of the block to the color assigned to the rui location
  //   if (this.selectedRUIs.find(url => url === tissueBlock.ruiLocationId)) {
  //     // Find the color assigned to the rui location
  //     availableColor = this.donorColorPalette.find(colorSwatch => colorSwatch.ruiLocationId === tissueBlock.ruiLocationId)!.color;
  //     return;
  //   // Otherwise we need to assign the next available color.
  //   } else {
  //     // If there are no more colors left and selected tissue block does not share a rui location with another selected block
  //     if (this.availableColors.length === 0 && !this.selectedRUIs.includes(tissueBlock.ruiLocationId)) {
  //       // make the available color the oldest color
  //       const oldestRuiLocation = this.tissueBlockRegistry[0].ruiLocationId;
  //       availableColor = this.getTissueBlockColor(oldestRuiLocation);
  //     } else {
  //       availableColor = this.availableColors[0];
  //     }
  //   }
  //   console.log(availableColor);
  // }

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
