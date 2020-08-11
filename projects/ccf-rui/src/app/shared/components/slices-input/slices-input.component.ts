import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';

/**
 * Interface containing slices data of the tissue block
 */
export interface SlicesData {

  /**
   * Thickness of each tissue slice
   */
  thickness: number;

  /**
   * Number of slices in the block
   */
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

  /**
   * Determine if the units are visible on the thickness input
   */
  unitsVisible = false;

  /**
   * Values of block dimensions to be emitted
   */
  slicesData: SlicesData = {
    thickness: NaN,
    numSlices: NaN
  };

  /**
   * Emitter for slice data values
   */
  @Output() valuesChange = new EventEmitter<SlicesData>();

  /**
   * The input element
   */
  @ViewChild('input', { static: true, read: ElementRef }) inputElement: ElementRef<HTMLElement>;

  /**
   * Limits the length of the input if needed and updates values when an input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateSlicesData(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    const max = 999;
    const maxLength = max.toString().length-1;
    const newVal = parseInt(inputValue, 10) < max ? parseInt(inputValue, 10) : parseInt(inputValue.substring(0, maxLength), 10);
    this.slicesData = { ...this.slicesData, [key]: newVal };
    console.log(this.slicesData);
    this.valuesChange.emit(this.slicesData);
  }

  /**
   * Refreshes all slice data values to empty values
   */
  refreshSlices(): void {
    this.slicesData = {thickness: NaN, numSlices: NaN};
    console.log(this.slicesData);
    this.valuesChange.emit(this.slicesData);
  }

  /**
   * Listens to document click event
   * Shows the thickness units when data is entered into the form or when input element is clicked
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target'])
  toggleUnits(target: HTMLElement): void {
    const { inputElement: { nativeElement: content } = { nativeElement: undefined } } = this;
    if (content?.contains(target) || !isNaN(this.slicesData.thickness)) {
      this.unitsVisible = true;
    } else {
      this.unitsVisible = false;
    }
  }
}
