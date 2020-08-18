import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Interface containing slices data of the tissue block
 */
export interface SlicesConfig {
  /** Thickness of each tissue slice */
  thickness: number;
  /** Number of slices in the block */
  numSlices: number;
}

/** Default values for slices config. */
const DEFAULT_SLICES_CONFIG: SlicesConfig = {
  thickness: NaN,
  numSlices: NaN
};

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
   * Values of block dimensions to be emitted
   */
  @Input() slicesConfig = DEFAULT_SLICES_CONFIG;

  /**
   * Emitter for slice data values
   */
  @Output() readonly slicesConfigChange = new EventEmitter<SlicesConfig>();

  /**
   * Returns whether a valid thickness value has been entered.
   */
  get hasThicknessValue(): boolean {
    return !isNaN(this.slicesConfig.thickness);
  }

  /**
   * Limits the length of the input if needed and updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateSlicesData(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.slicesConfig = { ...this.slicesConfig, [key]: +inputTarget.value };
    this.slicesConfigChange.emit(this.slicesConfig);
  }

  /**
   * Refreshes all slice data values to empty values
   */
  refreshSlices(): void {
    this.slicesConfig = DEFAULT_SLICES_CONFIG;
    this.slicesConfigChange.emit(this.slicesConfig);
  }
}
