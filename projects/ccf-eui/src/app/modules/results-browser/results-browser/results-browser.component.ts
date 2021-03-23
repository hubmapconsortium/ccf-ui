import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AggregateResult, ListResult } from 'ccf-database';
import { TissueBlockResult } from '../../../core/models/tissue-block-result';

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

  @Input() allColors: string[] = [
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
  ]

  @Input() availableColors: string[] = [
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

  donorColorPalette: ColorPalette = [];

  selectedRUIs: string[] = [];

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
  

  handleDonorCardSelection($event: boolean, donor: TissueBlockResult): void {
    // Will call results state method to update selections / colors.
    const selected = $event;
    if (selected) {
      this.selectTissueBlock(donor);
    } else {
      this.deselectTissueBlock(donor);
    }
  }

  getTissueBlockColor(ruiLocationId: string): string {
    // Will get colors from results state.
    return this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)?.color || '';
  }

  isTissueBlockSelected(block: TissueBlockResult): boolean {
    // Will get selected state from results state.
    if (this.tissueBlockRegistry.find(tissueBlock => tissueBlock.tissueBlockId === block['@id'])) {
      return true;
    }
    return false;
  }

  selectTissueBlock(tissueBlock: TissueBlockResult, color?: string): void {
    let availableColor: string;
    if (color) {
      // If a color is passed in, and it is a valid color of the color palette, then use it for the selected tissueBlock.
      if (this.donorColorPalette.find(tempColor => tempColor.color === color)) {
        // this.useColor(this.donorColorPalette.find(tempColor => tempColor.color === color)!.color, tissueBlock.ruiLocationId);
      }
    }
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

  updateColorWithLocation(oldColor: string, newColor: string): void {
    let paletteCopy = [...this.donorColorPalette];
    paletteCopy.find(tempColor => tempColor.color === oldColor)!.ruiLocationId = newColor;
    this.donorColorPalette = paletteCopy;
  }


  // selectTissueBlock(tissueBlock: TissueBlockResult, color?: string): void {
  //   console.log('select tissue block');
  //   // Register this tissue block as having been selected.
  //   this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], ruiLocationId: tissueBlock.ruiLocationId });
  //   console.log(this.tissueBlockRegistry)
  //   if (color) {
  //     // If a color is passed in, and it is a valid color of the color palette, then use it for the selected tissueBlock.
  //     if (this.donorColorPalette.find(tempColor => tempColor.color === color)) {
  //       this.useColor(this.donorColorPalette.find(tempColor => tempColor.color === color)!.color, tissueBlock.ruiLocationId);
  //     }
  //   }
  //   // If the ruiLocationId of this tissue block already has a color assigned to it, we're done.
  //   if (this.donorColorPalette.find(color => color.ruiLocationId === tissueBlock.ruiLocationId)) {
  //     return;
  //   }
  //   // Otherwise we need to assign the next available color.
  //   this.useColor(this.getNextColor(), tissueBlock.ruiLocationId);
  // }

  // deselectTissueBlock(tissueBlock: TissueBlockResult): void {
  //   console.log('deselect tissue block');
  //   // If the passed in tissue block isn't on the registry then it's already deselected.
  //   if (!this.tissueBlockRegistry.find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])) {
  //     return;
  //   }
  //   // Remove the block from the selection registry.
  //   const blockIndex = this.tissueBlockRegistry.indexOf(this.tissueBlockRegistry.find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])!);
  //   this.tissueBlockRegistry.splice(blockIndex, 1);
  //   // If there are no more blocks with the same ruiLocationId selected then the color needs to be set to available now.
  //   if (this.tissueBlockRegistry.filter(block => block.ruiLocationId === tissueBlock.ruiLocationId).length < 1) {
  //     this.setColorAvailability(this.getTissueBlockColor(tissueBlock.ruiLocationId), true);
  //   }
  // }

  // getNextColor(ruiLocationId?: string): string {
  //   console.log('get next color() called.')
  //   // If ruiLocationId is passed in, check first if there is already a color assigned to it.
  //   if (ruiLocationId) {
  //     if (this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)) {
  //       console.log('re-using old color.')
  //       return this.donorColorPalette.find(color => color.ruiLocationId === ruiLocationId)!.color;
  //     }
  //   }
  //   let availableColors = [...this.donorColorPalette];
  //   availableColors = availableColors.filter(color => color.available);
  //   console.log('availablecolors: ', availableColors);
  //   if (availableColors.length > 0) {
  //     console.log('availableColors.length', availableColors.length)
  //     let newColor = availableColors[0].color;
  //     this.donorColorPalette.find(color => color.color === newColor)!.available = false;
  //     return newColor;
  //   }
  //   // If there are no available colors, we need to make one available.
  //   return this.recycleOldestColor();
  // }

  recycleOldestColor(newRuiLocation: string): string {
    console.log('attempting to recycle oldest color().');
    // Should not be recycling colors if none are currently selected.
    if (this.tissueBlockRegistry.length <= 0) {
      console.log('but it should not be');
      return '';
    }
    const registryCopy: TissueBlockRegistry = [];
    const oldestRuiLocation = this.tissueBlockRegistry[0].ruiLocationId;
    const oldColor = this.getTissueBlockColor(oldestRuiLocation);
    // Remove all registry entries that have the same RUI location ID.
    this.tissueBlockRegistry.forEach((entry: TissueBlockRegistryEntry) => {
      console.log(entry)
      if (entry.ruiLocationId !== oldestRuiLocation) {
        this.selectedRUIs = this.selectedRUIs.filter(rui => rui !== oldestRuiLocation);
        registryCopy.push(entry);
      }
    });
    this.selectedRUIs.push(newRuiLocation)
    this.tissueBlockRegistry = registryCopy;
    return oldColor;
  }

  // setColorAvailability(color: string, available: boolean): void {
  //   console.log('set color availability');
  //   // Color must be a valid color from the palette.
  //   if (!this.donorColorPalette.find(tempColor => tempColor.color === color)) {
  //     return;
  //   }
  //   let paletteCopy = [...this.donorColorPalette];
  //   paletteCopy.find(tempColor => tempColor.color === color)!.available = available;
  //   this.donorColorPalette = paletteCopy;
  // }
  
  // useColor(color: string, ruiLocationId): void {
  //   console.log('use color');
  //   // Can only use colors that are in the color palette.
  //   if (!this.donorColorPalette.find(tempColor => tempColor.color === color)) {
  //     console.log('color not found')
  //     return;
  //   }
  //   let paletteCopy = [...this.donorColorPalette];
  //   paletteCopy.find(tempColor => tempColor.color === color)!.ruiLocationId = ruiLocationId;
  //   paletteCopy.find(tempColor => tempColor.color === color)!.available = false;
  //   this.donorColorPalette = paletteCopy;
  //   console.log(this.donorColorPalette)
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
