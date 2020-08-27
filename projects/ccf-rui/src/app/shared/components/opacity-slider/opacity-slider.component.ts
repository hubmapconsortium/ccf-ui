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

  @Input() disabled = true;

  @Output() readonly opacityChange = new EventEmitter<number>();

  hidden = true;

  changeOpacity(newOpacity: string): void {
    this.opacity = parseInt(newOpacity, 10);
    this.hidden = this.opacity === 100 ? true : false;
    this.opacityChange.emit(this.opacity);
  }
}
