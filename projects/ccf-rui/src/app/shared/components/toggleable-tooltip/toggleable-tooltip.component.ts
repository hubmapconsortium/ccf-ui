import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ccf-toggleable-tooltip',
  templateUrl: './toggleable-tooltip.component.html',
  styleUrls: ['./toggleable-tooltip.component.scss']
})
export class ToggleableTooltipComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-toggleable-tooltip';

  @Input() tooltip: string;
  @Input() visible: boolean;
  @Input() offset: number;
  @Input() direction: 'left' | 'right' | 'up' | 'down';
}
