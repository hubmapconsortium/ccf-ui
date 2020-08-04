import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ccf-block-size-input',
  templateUrl: './block-size-input.component.html',
  styleUrls: ['./block-size-input.component.scss']
})
export class BlockSizeInputComponent {

  values: Record<string, unknown> = {width: '10', height: '10', depth: '10'};
  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();

  constructor() { }

  updateBlockSize(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.values = { ...this.values, [key]: inputValue };
    console.log(this.values)
    this.valuesChange.emit(this.values);
  }

  refreshBlockSize(): void {
    this.values = {width: '10', height: '10', depth: '10'};
    console.log(this.values)
    this.valuesChange.emit(this.values);
  }
}
