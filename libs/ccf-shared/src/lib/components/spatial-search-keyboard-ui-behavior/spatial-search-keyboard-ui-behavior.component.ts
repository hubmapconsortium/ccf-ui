import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * Behavioral component for spatial search keyboard UI
 */
@Component({
  selector: 'ccf-spatial-search-keyboard-ui-behavior',
  templateUrl: './spatial-search-keyboard-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchKeyboardUIBehaviorComponent {
  /** HTML class */
  @HostBinding('class') readonly className =
    'ccf-spatial-search-keyboard-ui-behavior';

  /** Amount the position shifts for each key press */
  @Input() delta = 1;

  /** Input of spatial search keyboard uibehavior component */
  @Input() shiftDelta = 2;

  /** Current position of spatial search */
  @Input() position!: Position;

  @Input() disablePositionChange = false;

  /** Emits when position changes */
  @Output() readonly changePosition = new EventEmitter<Position>();

  /** Current key being pressed/clicked */
  currentKey?: string;

  /** Current delta */
  currentDelta!: number;

  /** True while shift key is pressed */
  shiftPressed = false;

  /**
   * Shifts position based on key
   * @param key Key value
   */
  updatePosition(key: string): void {
    this.currentDelta = this.shiftPressed ? this.shiftDelta : this.delta;
    if (key === 'Shift') {
      this.shiftPressed = true;
    } else {
      this.currentKey = key.toLowerCase();
      switch (this.currentKey) {
        case 'q':
          this.position = {
            ...this.position,
            z: this.position.z + this.currentDelta,
          };
          break;
        case 'e':
          this.position = {
            ...this.position,
            z: this.position.z - this.currentDelta,
          };
          break;
        case 'w':
          this.position = {
            ...this.position,
            y: this.position.y + this.currentDelta,
          };
          break;
        case 's':
          this.position = {
            ...this.position,
            y: this.position.y - this.currentDelta,
          };
          break;
        case 'a':
          this.position = {
            ...this.position,
            x: this.position.x - this.currentDelta,
          };
          break;
        case 'd':
          this.position = {
            ...this.position,
            x: this.position.x + this.currentDelta,
          };
          break;
        default:
          break;
      }
      this.changePosition.emit(this.position);
    }
  }

  /**
   * Listens for keydown keyboard event and updates the position
   * @param target Keyboard event
   */
  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    if (this.disablePositionChange) {
      return;
    }
    target.preventDefault();
    this.updatePosition(target.key);
  }

  /**
   * Listens for keyup keyboard event and updates currentKey / shiftPressed
   * @param target Keyboard event
   */
  @HostListener('document:keyup', ['$event'])
  keyUp(target: KeyboardEvent): void {
    if (target.key === 'Shift') {
      this.shiftPressed = false;
    } else {
      this.currentKey = undefined;
    }
  }

  /**
   * Updates the position when a key is clicked
   * @param key Key value
   */
  keyClick(key: string): void {
    this.updatePosition(key);
  }

  /**
   * Updates current key when a key is hovered over
   * @param key Key value
   */
  keyHover(key?: string): void {
    this.currentKey = key;
  }
}
