import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

import { VisibilityItem } from '../visibility-menu/visibility-menu.component';

@Component({
  selector: 'ccf-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss']
})
export class OpacitySliderComponent {

  @HostBinding('class') readonly clsName = 'ccf-opacity-slider';

  @Input() selectedItem: VisibilityItem = undefined;

  @Input() value = 100;

  @Output() readonly opacityChange = new EventEmitter<number>();

  hidden = true;

  constructor() { }

  changeOpacity(newOpacity: string): void {
    this.value = parseInt(newOpacity, 10);
    this.hidden = this.value === 100 ? true : false;
    this.opacityChange.emit(this.value);
  }
}
