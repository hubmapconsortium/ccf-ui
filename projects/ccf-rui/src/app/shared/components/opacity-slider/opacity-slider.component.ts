import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Slider for setting opacity on an anatomical structure
 */
@Component({
  selector: 'ccf-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss']
})
export class OpacitySliderComponent {

  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-opacity-slider';

  /**
   * The value displayed in the slider
   */
  @Input() opacity = 20;

  /**
   * Whether the item is set to visible
   */
  @Input() visible = true;

  /**
   * Emits the updated opacity when the opacity changes
   */
  @Output() readonly opacityChange = new EventEmitter<number>();

  /**
   * Output  of opacity slider component
   */
  @Output() readonly visibilityToggle = new EventEmitter();

  /**
   * Emitter for resetting all opacity values to default
   */
  @Output() readonly opacityReset = new EventEmitter();

  /**
   * Emits opacityChange with the new opacity value
   * @param newOpacity The updated opacity value
   */
  changeOpacity(newOpacity: string): void {
    this.opacity = parseInt(newOpacity, 10);
    this.opacityChange.emit(this.opacity);
  }

  /**
   * Emits signal to toggle the visibility of the item
   */
  toggleVisibility(): void {
    this.visibilityToggle.emit();
  }

  /**
   * Emits signal to reset the opacity of the item
   */
  resetOpacity(): void {
    this.opacityReset.emit();
  }
}
