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

  @Input() visible = true;
  /**
   * Emits the updated opacity when the opacity chanes
   */
  @Output() readonly opacityChange = new EventEmitter<number>();

  
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

  toggleVisibility(): void {
    this.visibilityToggle.emit();
  }

  /**
   * Resets opacity value for the item
   */
  resetOpacity(): void {
    this.opacityReset.emit();
  }
}
