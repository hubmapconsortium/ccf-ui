import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export interface SpatialSearchPosition {
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'ccf-spatial-search-keyboard-ui-behavior',
  templateUrl: './spatial-search-keyboard-ui-behavior.component.html',
  styleUrls: ['./spatial-search-keyboard-ui-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchKeyboardUIBehaviorComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui-behavior';

  @Input() delta = 1;

  @Input() shiftDelta = 2;

  @Input() position: SpatialSearchPosition = {
    x: 0,
    y: 0,
    z: 0
  };

  @Output() readonly changePosition = new EventEmitter<SpatialSearchPosition>();

  currentKey?: string;

  currentDelta: number;

  shiftPressed = false;

  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    target.preventDefault();
    this.currentKey = target.key;
    this.currentDelta = this.shiftPressed ? this.shiftDelta : this.delta;
    switch (this.currentKey?.toLowerCase()) {
      case 'shift':
        this.shiftPressed = true;
        break;
      case 'q':
        this.position = { ...this.position, z: this.position.z + this.currentDelta };
        break;
      case 'e':
        this.position = { ...this.position, z: this.position.z - this.currentDelta };
        break;
      case 'w':
        this.position = { ...this.position, y: this.position.y + this.currentDelta };
        break;
      case 's':
        this.position = { ...this.position, y: this.position.y - this.currentDelta };
        break;
      case 'a':
        this.position = { ...this.position, x: this.position.x - this.currentDelta };
        break;
      case 'd':
        this.position = { ...this.position, x: this.position.x + this.currentDelta };
        break;
      default:
        break;
    }
    this.changePosition.emit(this.position);
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(target: KeyboardEvent): void {
    if (target.key === 'Shift') {
      this.shiftPressed = false;
    } else {
      this.currentKey = undefined;
    }
  }
}
