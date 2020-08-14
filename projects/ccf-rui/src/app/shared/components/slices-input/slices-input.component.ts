import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

/**
 * Interface containing slices data of the tissue block
 */
export interface SlicesData {
  /** Thickness of each tissue slice */
  thickness: number;
  /** Number of slices in the block */
  numSlices: number;
}

/**
 * Component for entering data on block slices
 */
@Component({
  selector: 'ccf-slices-input',
  templateUrl: './slices-input.component.html',
  styleUrls: ['./slices-input.component.scss']
})
export class SlicesInputComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-slices-input';

  /**
   * Emitter for slice data values
   */
  @Output() readonly valuesChange = new EventEmitter<SlicesData>();

  /**
   * Values of block dimensions to be emitted
   */
  slicesData: SlicesData = {
    thickness: NaN,
    numSlices: NaN
  };

  /**
   * Returns whether a valid thickness value has been entered.
   */
  get hasThicknessValue(): boolean {
    return !isNaN(this.slicesData.thickness);
  }

  /**
   * Limits the length of the input if needed and updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateSlicesData(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.slicesData = { ...this.slicesData, [key]: +inputTarget.value };
    this.valuesChange.emit(this.slicesData);
  }

  /**
   * Refreshes all slice data values to empty values
   */
  refreshSlices(): void {
    this.slicesData = { thickness: NaN, numSlices: NaN };
    this.valuesChange.emit(this.slicesData);
  }
}
