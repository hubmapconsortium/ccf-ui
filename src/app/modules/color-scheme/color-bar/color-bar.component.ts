import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ColorScheme } from '../color-schemes';

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

  @Input() selected = false;

  /**
   * Emits the newly selected color
   */
  @Output() colorChange = new EventEmitter<string | undefined>();

  /**
   * Enables dynamic styling for gradient bars
   */
  gradientstyle: string;

  selectedColorIndex = 0;

  /**
   * Sets the gradient style (when applicable) on load
   */
  ngOnInit() {
    this.gradientstyle = this.colorScheme.type === 'gradient' ? `linear-gradient(to right, ${this.gradientColorString()})` : 'none';
  }

  gradientColorString() {
    const result : string[] = [];
    for (let i = 0; i < this.colorScheme.colors.length; i++) {
      result.push(this.colorScheme.colors[i] + ' ' + this.colorScheme.positions[i] * 100 + '%');
    }
    return result.join(', ');
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
