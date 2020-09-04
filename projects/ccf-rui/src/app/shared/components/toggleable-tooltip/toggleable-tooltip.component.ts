import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-toggleable-tooltip',
  templateUrl: './toggleable-tooltip.component.html',
  styleUrls: ['./toggleable-tooltip.component.scss']
})
export class ToggleableTooltipComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-toggleable-tooltip';

  constructor() { }

  ngOnInit(): void {
  }

}
