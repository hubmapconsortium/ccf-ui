import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Position } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';


@Component({
  selector: 'ccf-spatial-search-keyboard-ui-behavior',
  templateUrl: './spatial-search-keyboard-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchKeyboardUIBehaviorComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui-behavior';

  @Input() delta = 1;

  @Input() shiftDelta = 2;

  @Input() position: Position;

  @Output() readonly changePosition = new EventEmitter<Position>();

  currentKey?: string;

  currentDelta: number;

  shiftPressed = false;

  updatePosition(key: string): void {
    this.currentDelta = this.shiftPressed ? this.shiftDelta : this.delta;
    if (key === 'Shift') {
      this.shiftPressed = true;
    } else {
      this.currentKey = key.toLowerCase();
      switch (this.currentKey) {
        case 'q':
          this.position = { ...this.position, z: this.position.z - this.currentDelta };
          break;
        case 'e':
          this.position = { ...this.position, z: this.position.z + this.currentDelta };
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
  }

  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    target.preventDefault();
    this.updatePosition(target.key);
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(target: KeyboardEvent): void {
    if (target.key === 'Shift') {
      this.shiftPressed = false;
    } else {
      this.currentKey = undefined;
    }
  }

  keyClick(key: string): void {
    this.updatePosition(key);
  }

  keyHover(key?: string): void {
    this.currentKey = key;
  }
}
