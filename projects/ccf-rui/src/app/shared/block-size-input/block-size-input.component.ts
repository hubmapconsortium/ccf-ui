import { Component, Output, EventEmitter } from '@angular/core';

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
  values: Record<string, unknown> = {width: '10', height: '10', depth: '10'};

  /**
   * Emitter for values
   */
  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Updates values when a dimension input changes
   * @param input InputEvent from the input element which contains the new value
   * @param key Name of the dimension to be updated
   */
  updateBlockSize(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.values = { ...this.values, [key]: inputValue };
    console.log(this.values);
    this.valuesChange.emit(this.values);
  }

  /**
   * Refreshes all block size values to 10
   */
  refreshBlockSize(): void {
    this.values = {width: '10', height: '10', depth: '10'};
    console.log(this.values);
    this.valuesChange.emit(this.values);
  }
}
