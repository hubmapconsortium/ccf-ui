import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';

/**
 * Color bar component for the color scheme popup and color scheme selector
 */
@Component({
  selector: 'ccf-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {

  /**
   * Color scheme to be displayed in the color bar
   */
  @Input() colorScheme: ColorScheme;

  /**
   * Emits the newly selected color
   */
  @Output() colorChange = new EventEmitter<string | undefined>();

  /**
   * Array for iterating through colors to be displayed
   */
  colorIndex: number[];

  /**
   * Enables dynamic styling for gradient bars
   */
  gradientstyle: string;

  @Input() selected = false;

  selectedColorIndex = 0;

  /**
   * Sets the color status array, color index array, and gradient style (when applicable) on load
   */
  ngOnInit() {
    this.colorIndex = this.colorScheme.type === 'discrete' ? [0,1,2,3,4,5,6] : [0];
    this.gradientstyle = this.colorScheme.type === 'gradient' ? `linear-gradient(to right, ${this.getColor(0)} , ${this.getColor(1)}, ${this.getColor(2)})` : 'none';
  }

  /**
   * Returns the color at a specific index in the colors array of color scheme (used for gradientstyle)
   * @param coloridx index of desired color
   */
  getColor(coloridx: number) {
    return this.colorScheme.colors[coloridx];
  }

  /**
   * Emits the newly selected color
   * @param colorpos [scheme index, color index]
   */
  colorChanged(index: number) {
    this.selected = true;
    this.selectedColorIndex = index;
    const selectedColor = this.colorScheme.type === 'discrete' ? this.colorScheme.colors[index] : undefined;
    this.colorChange.emit(selectedColor);
  }

  isColorSelected(n: number) {
    return this.selectedColorIndex === n;
  }
}
