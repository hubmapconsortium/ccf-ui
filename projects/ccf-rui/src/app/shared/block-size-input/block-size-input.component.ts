import { Component, Output, EventEmitter } from '@angular/core';

export interface TissueData {
  width: number;
  height: number;
  depth: number;
}

/**
 * Component for entering dimensions of the tissue block
 */
@Component({
  selector: 'ccf-block-size-input',
  templateUrl: './block-size-input.component.html',
  styleUrls: ['./block-size-input.component.scss']
})
export class BlockSizeInputComponent {

  /**
   * Values of block dimensions to be emitted
   */
  tissueData: TissueData = {
    width: 10,
    height: 10,
    depth: 10,
  };

  /**
   * Emitter for values
   */
  @Output() valuesChange = new EventEmitter<TissueData>();

  /**
   * Updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateTissueData(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.tissueData = { ...this.tissueData, [key]: inputValue };
    console.log(this.tissueData);
    this.valuesChange.emit(this.tissueData);
  }

  /**
   * Refreshes all block size values to 10
   */
  refreshBlockSize(): void {
    this.tissueData = { ...this.tissueData, width: 10, height: 10, depth: 10};
    console.log(this.tissueData);
    this.valuesChange.emit(this.tissueData);
  }
}
