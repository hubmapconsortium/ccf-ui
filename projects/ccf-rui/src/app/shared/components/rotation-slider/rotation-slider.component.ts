import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';


/** Type in which the values of the sliders are stored. */
export interface Rotation {
  /** X slider value */
  x: number;
  /** Y slider value */
  y: number;
  /** Z slider value */
  z: number;
}

/**
 * Component that enables the setting of a Rotation object via either 3 draggable sliders
 * or through an Input method.
 */
@Component({
  selector: 'ccf-rotation-slider',
  templateUrl: './rotation-slider.component.html',
  styleUrls: ['./rotation-slider.component.scss']
})
export class RotationSliderComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-rotation-slider';

  /**
   * Input that allows the rotation to be changed from outside of the component
   */
  @Input() rotation: Rotation = { x: 0, y: 0, z: 0 };

  /**
   * Output that emits the new rotation whenever it is changed from within the component
   */
  @Output() readonly rotationChange = new EventEmitter<Rotation>();

  /**
   * Function that handles updating the rotation and emitting the new value
   * @param newRotation the new value for one of the axis to be set to
   * @param axis which axis to update
   */
  changeRotation(newRotation: number | string, axis: string): void {
    this.rotation = { ... this.rotation, [axis]: +newRotation };
    this.rotationChange.emit(this.rotation);
  }

  /**
   * Function to easily reset the rotations to 0 and emit this change.
   */
  resetRotation(): void {
    this.rotation = { x: 0, y: 0, z: 0 };
    this.rotationChange.emit(this.rotation);
  }
}
