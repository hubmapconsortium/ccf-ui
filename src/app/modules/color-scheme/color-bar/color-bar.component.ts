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
   * Index of the currently selected color in colorScheme.colors
   */
  @Input() coloridx = 0;

  /**
   * Determines if colors are able to be selected on the color bar
   */
  @Input() enableSelection = false;

  /**
   * Emits the newly selected color index
   */
  @Output() colorChange = new EventEmitter<number>();

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
   * After a color selected, changes coloridx to the index of the selected color and emits the 
   * selected color index (if color selection enabled)
   * 
   * @param idx  index of the selected color
   */
  colorChanged(idx: number) {
    if (!this.enableSelection) {
      return;
    } else {
      this.selected = true;
      this.coloridx = idx;
      this.colorChange.emit(idx);
    }
  }
}
