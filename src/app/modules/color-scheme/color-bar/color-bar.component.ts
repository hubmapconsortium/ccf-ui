import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ColorScheme } from '../color-schemes';

/**
 * Color bar component for the color scheme popup and color scheme selector
 */
@Component({
  selector: 'ccf-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent {

  /**
   * Color scheme to be displayed in the color bar
   */
  @Input() colorScheme: ColorScheme;

  /**
   * Whether or not the scheme is currently selected
   */
  @Input() selected = false;

  /**
   * Emits the newly selected color
   */
  @Output() colorChange = new EventEmitter<string | undefined>();

  /**
   * Index of the currently selected color in colorScheme.colors
   */
  selectedColorIndex = 0;

  /**
   * Enables dynamic styling for gradient bars
   */
  get gradientStyle(): string {
    const { colors, positions } = this.colorScheme;
    const result: string[] = [];
    for (let i = 0; i < colors.length; i++) {
      result.push(`${colors[i]} ${positions[i] * 100}%`);
    }
    return `linear-gradient(to right, ${result.join(', ')})`;
  }

  /**
   * Returns whether or not the scheme is a selected gradient (for highlighting purposes)
   */
  gradientHighlight() {
    return this.colorScheme.type === 'gradient' && this.selected ? true : false;
  }

  /**
   * After a color selected, changes selectedColorIndex to the index of the selected color and emits the selected color
   * @param idx  index of the selected color
   */
  colorChanged(idx: number) {
    this.selected = true;
    this.selectedColorIndex = idx;
    const selectedColor = this.colorScheme.type === 'discrete' ? this.colorScheme.colors[idx] : undefined;
    this.colorChange.emit(selectedColor);
  }
}
