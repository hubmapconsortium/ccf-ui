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

  @Input() shiftDelta: number;

  @Input() position: SpatialSearchPosition = {
    x: 0,
    y: 0,
    z: 0
  };

  @Output() readonly changePosition = new EventEmitter<SpatialSearchPosition>();

  currentDirection?: string;

  currentKey?: string;

  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    target.preventDefault();
    this.currentKey = target.key;
    switch (target.key) {
      case 'q':
        this.currentDirection = 'west';
        this.position = { ...this.position, z: this.position.z + this.delta };
        break;
      case 'e':
        this.currentDirection = 'east';
        this.position = { ...this.position, z: this.position.z - this.delta };
        break;
      case 'w':
        this.currentDirection = 'north';
        this.position = { ...this.position, y: this.position.y + this.delta };
        break;
      case 's':
        this.currentDirection = 'south';
        this.position = { ...this.position, y: this.position.y - this.delta };
        break;
      case 'a':
        this.currentDirection = 'west';
        this.position = { ...this.position, x: this.position.x - this.delta };
        break;
      case 'd':
        this.currentDirection = 'east';
        this.position = { ...this.position, x: this.position.x + this.delta };
        break;
      default:
        break;
    }
    this.changePosition.emit(this.position);
    console.log(this.position);
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(): void {
    this.currentDirection = undefined;
    this.currentKey = undefined;
  }


}
