import { Component, EventEmitter, HostBinding, Output } from '@angular/core';


/**
 * Interface for objects containing tissue block dimensions
 */
export interface BlockSizes {
  /** Width of block */
  x: number;
  /** Height of block */
  y: number;
  /** Depth of block */
  z: number;
}

const DEFAULT_BLOCK_SIZES: BlockSizes = {
  x: 10,
  y: 10,
  z: 10
};

/**
 * Component for entering dimensions of the tissue block
 */
@Component({
  selector: 'ccf-block-size-input',
  templateUrl: './block-size-input.component.html',
  styleUrls: ['./block-size-input.component.scss']
})
export class BlockSizeInputComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-block-size-input';

  /**
   * Values of block dimensions to be emitted
   */
  blockSizes: BlockSizes = DEFAULT_BLOCK_SIZES;

  /**
   * Emitter for values
   */
  @Output() valuesChange = new EventEmitter<BlockSizes>();

  /**
   * Updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateBlockSizes(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.blockSizes = { ...this.blockSizes, [key]: +inputTarget.value };
    this.valuesChange.emit(this.blockSizes);
  }

  /**
   * Refreshes all block size values to 10
   */
  refreshBlockSize(): void {
    this.blockSizes = DEFAULT_BLOCK_SIZES;
    this.valuesChange.emit(this.blockSizes);
  }
}
