import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';


@Component({
  selector: 'ccf-spatial-search-keyboard-ui',
  templateUrl: './spatial-search-keyboard-ui.component.html',
  styleUrls: ['./spatial-search-keyboard-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchKeyboardUIComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui';

  @Input() currentKey?: string;

  @Input() shiftPressed: boolean;

  @Output() readonly keyClicked = new EventEmitter<string>();

  @Output() readonly keyHovered = new EventEmitter<string | undefined>();

  keyMap = [
    {
      key: 'w',
      direction: 'north'
    },
    {
      key: 's',
      direction: 'south'
    },
    {
      key: 'a',
      direction: 'west'
    },
    {
      key: 'd',
      direction: 'east'
    },
    {
      key: 'e',
      direction: 'north_east'
    },
    {
      key: 'q',
      direction: 'south_west'
    }
  ];
}
