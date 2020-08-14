import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccf-side-selector',
  templateUrl: './side-selector.component.html',
  styleUrls: ['./side-selector.component.scss']
})
export class SideSelectorComponent {

  @Input() left = false;
  @Output() sideChanged = new EventEmitter<string>();

  constructor() { }

  updateSide(selection: boolean): void {
    this.left = selection;
    this.sideChanged.emit(this.left ? 'left' : 'right');
  }
}
