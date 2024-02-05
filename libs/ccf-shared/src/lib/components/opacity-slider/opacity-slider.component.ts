import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

/**
 * Slider for setting opacity on an anatomical structure
 */
@Component({
  selector: 'ccf-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpacitySliderComponent implements OnInit {
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
   * Emitted when slider thumb is moved
   */
  @Output() readonly sliderChanged = new EventEmitter<string>();

  prevOpacity!: number;

  ngOnInit(): void {
    if (this.visible) {
      this.prevOpacity = 0;
    } else {
      this.prevOpacity = 20;
    }
  }

  reset(): void {
    this.prevOpacity = 20;
  }

  /**
   * Emits signal to toggle the visibility of the item
   */
  toggleVisibility(): void {
    const temp = this.opacity;
    this.opacity = this.prevOpacity;
    this.prevOpacity = temp;
    this.visibilityToggle.emit();
    this.opacityChange.emit(this.opacity);
  }

  /**
   * Emits signal to reset the opacity of the item
   */
  resetOpacity(): void {
    this.prevOpacity = 0;
    this.opacityReset.emit();
  }
}
