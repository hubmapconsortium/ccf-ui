import { Component, HostBinding, Input } from '@angular/core';

/**
 * Component that creates a customizable and toggleable tooltip.
 */
@Component({
  selector: 'ccf-toggleable-tooltip',
  templateUrl: './toggleable-tooltip.component.html',
  styleUrls: ['./toggleable-tooltip.component.scss']
})
export class ToggleableTooltipComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-toggleable-tooltip';

  /**
   * Input that sets the content of the tooltip.
   */
  @Input() tooltip = '';

  /**
   * Input that determines whether or not the tooltip is rendered or not.
   */
  @Input() visible = true;

  /**
   * Input that allows fine tuning of tooltip placement (in REM)
   */
  @Input() offset = 0;

  /**
   * Input that determines which direction the tooltip goes.
   */
  @Input() direction: 'left' | 'right' | 'up' | 'down' = 'right';
}
