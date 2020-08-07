import { Component, Output, EventEmitter } from '@angular/core';

export interface SlicesData {
  thickness?: number | '';
  numSlices?: number | '';
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

  /**
   * Values of block dimensions to be emitted
   */
  slicesData: SlicesData = {
    thickness: '',
    numSlices: ''
  };

  /**
   * Emitter for slice data values
   */
  @Output() valuesChange = new EventEmitter<SlicesData>();

  /**
   * Updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateSlicesData(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.slicesData = { ...this.slicesData, [key]: inputValue };
    console.log(this.slicesData);
    this.valuesChange.emit(this.slicesData);
  }

  /**
   * Refreshes all slice data values to empty strings
   */
  refreshSlices(): void {
    delete this.slicesData?.thickness;
    delete this.slicesData?.numSlices;
    console.log(this.slicesData);
    this.valuesChange.emit(this.slicesData);
  }
}
