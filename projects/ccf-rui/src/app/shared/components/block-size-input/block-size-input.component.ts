import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Interface for objects containing tissue block dimensions
 */
export interface TissueData {

  /**
   * Width of block
   */
  x: number;

  /**
   * Height of block
   */
  y: number;

  /**
   * Depth of block
   */
  z: number;
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
    x: 10,
    y: 10,
    z: 10,
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
    this.tissueData = { ...this.tissueData, [key]: parseInt(inputValue, 10) };
    this.valuesChange.emit(this.tissueData);
    console.log(this.tissueData);
  }

  /**
   * Refreshes all block size values to 10
   */
  refreshBlockSize(): void {
    this.tissueData = { x: 10, y: 10, z: 10};
    this.valuesChange.emit(this.tissueData);
  }
}
