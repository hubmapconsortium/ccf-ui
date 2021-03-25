import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AggregateResult, ListResult, TissueBlockResult } from 'ccf-database';


export interface ColorSwatch {
  color: string;
  spatialEntityId: string;
}
export type ColorPalette = ColorSwatch[];

export interface TissueBlockRegistryEntry {
  tissueBlockId: string;
  spatialEntityId: string;
  color: string;
}
export type TissueBlockRegistry = TissueBlockRegistryEntry[];

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

  donorData: TissueBlockResult[] = [];

  donorColorPalette: ColorPalette = [];

  /**
   * Contains spatialEntityIds of selected tissue blocks
   */
  spatialEntityIds: string[] = [];

  /**
   * Keeps track of tissue blocks selected
   */
  tissueBlockRegistry: TissueBlockRegistry = [];

  ngOnInit(): void {
    for (const color of this.allColors) {
      const colorSwatch = {color, spatialEntityId: ''};
      this.donorColorPalette.push(colorSwatch);
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
  getTissueBlockColor(spatialEntityId: string): string {
    return this.donorColorPalette.find(color => color.spatialEntityId === spatialEntityId)?.color || '';
  }

  // Will get selected state from results state.
  isTissueBlockSelected(block: TissueBlockResult): boolean {
    return this.tissueBlockRegistry.find(tissueBlock => tissueBlock.tissueBlockId === block['@id']) ? true : false;
  }

  selectTissueBlock(tissueBlock: TissueBlockResult): void {
    let availableColor: string;
    // If the block's spatialEntityId has already been selected, assign the color of the block to the color assigned to the spatialEntityId
    if (this.spatialEntityIds.find(url => url === tissueBlock.spatialEntityId)) {
      // Find the color assigned to the spatialEntityId
      const newColor = this.donorColorPalette.find(colorSwatch => colorSwatch.spatialEntityId === tissueBlock.spatialEntityId)?.color || '';
      // Assign the color to the block and add block to tissueBlockRegistry
      this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], spatialEntityId: tissueBlock.spatialEntityId, color: newColor});
      return;
    // Otherwise we need to assign the next available color.
    } else {
      // If there are no more colors left and selected tissue block does not share a spatialEntityId with another selected block
      if (this.availableColors.length === 0 && !this.spatialEntityIds.includes(tissueBlock.spatialEntityId)) {
        // make the available color the oldest color
        availableColor = this.recycleOldestColor(tissueBlock.spatialEntityId);
      } else {
        // Add new spatialEntityId to spatialEntityIds
        this.spatialEntityIds.push(tissueBlock.spatialEntityId);
        // Get first available color and remove it from the available colors list
        availableColor = this.availableColors.shift() || '';
      }
      // Update appropriate color in donorColorPalette with new spatialEntityId
      this.updateColorWithId(availableColor, tissueBlock.spatialEntityId);
      // Find the color assigned to the spatialEntityId
      const newColor = this.donorColorPalette.find(colorSwatch => colorSwatch.spatialEntityId === tissueBlock.spatialEntityId)?.color || '';
      // Assign the color to the block and add block to tissueBlockRegistry
      this.tissueBlockRegistry.push({ tissueBlockId: tissueBlock['@id'], spatialEntityId: tissueBlock.spatialEntityId, color: newColor});
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
      }
      return 0;
    }
    // If tissue block is not in the registry then do nothing
    if (!this.tissueBlockRegistry.find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])) {
      console.log('block not found');
    } else {
      // Otherwise, remove tissue block from the registry
      const blockColor = this.donorColorPalette.find(colorSwatch => colorSwatch.spatialEntityId === tissueBlock.spatialEntityId)?.color || '';
      const blockIndex = this.tissueBlockRegistry.indexOf(this.tissueBlockRegistry
        .find(tBlock => tBlock.tissueBlockId === tissueBlock['@id'])!);
      this.tissueBlockRegistry.splice(blockIndex, 1);
      // If removed block's color is still being used, do nothing
      if (this.tissueBlockRegistry.find((tBlock) => tBlock.spatialEntityId === tissueBlock.spatialEntityId)) {
        return;
      }
      // Otherwise, add the color to available colors, remove spatialEntityId from spatialEntityIds,
      // and clear spatialEntityId for that color in donorColorPalette
      this.availableColors.push(blockColor);
      this.availableColors.sort(sorter);
      this.spatialEntityIds.splice(this.spatialEntityIds.indexOf(tissueBlock.spatialEntityId));
      this.updateColorWithId(blockColor, '');
    }
  }

  /**
   * Updates the spatialEntityId assigned to a color in the palette
   *
   * @param color The color to assign a id to
   * @param newId The new spatialEntityId
   */
  updateColorWithId(color: string, newId: string): void {
    const paletteCopy = [...this.donorColorPalette];
    paletteCopy.find(tempColor => tempColor.color === color).spatialEntityId = newId;
    this.donorColorPalette = paletteCopy;
  }

  /**
   * Recycles oldest color when all colors in the palette have been used
   *
   * @param newspatialEntityId the spatialEntityId of the latest block
   * @returns oldest color
   */
  recycleOldestColor(newspatialEntityId: string): string {
    // Should not be recycling colors if none are currently selected.
    if (this.tissueBlockRegistry.length <= 0) {
      return '';
    }
    const registryCopy: TissueBlockRegistry = [];
    const oldestspatialEntityId = this.tissueBlockRegistry[0].spatialEntityId;
    const oldColor = this.getTissueBlockColor(oldestspatialEntityId);
    // Remove all registry entries that have the same spatialEntityId ID; update spatialEntityIds to remove the old spatialEntityId
    this.tissueBlockRegistry.forEach((entry: TissueBlockRegistryEntry) => {
      if (entry.spatialEntityId !== oldestspatialEntityId) {
        this.spatialEntityIds = this.spatialEntityIds.filter(rui => rui !== oldestspatialEntityId);
        registryCopy.push(entry);
      }
    });
    this.spatialEntityIds.push(newspatialEntityId);
    this.tissueBlockRegistry = registryCopy;
    return oldColor;
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
