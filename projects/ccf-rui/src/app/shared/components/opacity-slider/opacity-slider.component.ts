import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

import { VisibilityItem } from '../visibility-menu/visibility-menu.component';

@Component({
  selector: 'ccf-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss']
})
export class OpacitySliderComponent {

  @HostBinding('class') readonly clsName = 'ccf-opacity-slider';

  @Input() selectedItem: VisibilityItem | undefined = undefined;

  @Input() opacity = 100;

  @Output() readonly opacityChange = new EventEmitter<number>();

  hidden = true;

  constructor() { }

  changeOpacity(newOpacity: number | string | undefined): void {
    if (typeof newOpacity === 'string') {
      this.opacity = parseInt(newOpacity, 10);
    } else if (newOpacity === undefined) {
      this.opacity = 100;
    } else {
      this.opacity = newOpacity;
    }
    this.hidden = this.opacity === 100 ? true : false;
    this.opacityChange.emit(this.opacity);
  }
}
