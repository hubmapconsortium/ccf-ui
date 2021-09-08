import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


/** Type in which the values of the sliders are stored. */
export interface Rotation {
  /** X slider value */
  x: number;
  /** Y slider value */
  y: number;
  /** Z slider value */
  z: number;
}

/** Default values for rotation. */
const DEFAULT_ROTATION: Rotation = {
  x: 0,
  y: 0,
  z: 0
};

/**
 * Component that enables the setting of a Rotation object via either 3 draggable sliders
 * or through an Input method.
 */
@Component({
  selector: 'ccf-rotation-slider',
  templateUrl: './rotation-slider.component.html',
  styleUrls: ['./rotation-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationSliderComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-rotation-slider';

  /**
   * Input that allows the rotation to be changed from outside of the component
   */
  @Input() rotation = DEFAULT_ROTATION;

  /**
   * Output that emits the new rotation whenever it is changed from within the component
   */
  @Output() readonly rotationChange = new EventEmitter<Rotation>();

  /**
   * Creates an instance of rotation slider component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Function that handles updating the rotation and emitting the new value
   *
   * @param newRotation the new value for one of the axis to be set to
   * @param axis which axis to update
   */
  changeRotation(newRotation: number | string, axis: string): void {
    this.rotation = { ... this.rotation, [axis]: +newRotation };
    this.ga.event('rotation_update', 'rotation_slider', axis, +newRotation);
    this.rotationChange.emit(this.rotation);
  }

  /**
   * Function to easily reset the rotations to 0 and emit this change.
   */
  resetRotation(): void {
    this.rotation = DEFAULT_ROTATION;
    this.ga.event('rotation_reset', 'rotation_slider');
    this.rotationChange.emit(this.rotation);
  }
}
