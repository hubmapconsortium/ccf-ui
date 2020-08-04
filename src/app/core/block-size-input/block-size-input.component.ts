import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccf-block-size-input',
  templateUrl: './block-size-input.component.html',
  styleUrls: ['./block-size-input.component.scss']
})
export class BlockSizeInputComponent {

  values: Record<string, unknown> = {width: 10, height: 10, depth: 10};
  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();

  constructor() { }

  updateBlockSize(value: unknown, key: string): void {
    this.values = { ...this.values, [key]: value };
    console.log(this.values)
    this.valuesChange.emit(this.values);
  }
}
