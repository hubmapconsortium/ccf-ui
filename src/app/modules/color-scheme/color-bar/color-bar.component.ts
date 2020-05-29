import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

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
   * Currently selected color in colorScheme.colors
   */
  @Input() selectedColor = '';

  /**
   * Determines if colors are able to be selected on the color bar
   */
  @Input() enableSelection = false;

  /**
   * Emits the newly selected color index
   */
  @Output() colorChange = new EventEmitter<string>();

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
   * When a color is selected, this updates relavant variables and emits the
   * selected color
   * @param color  the color the user selected
   */
  colorChanged(color: string) {
    if (!this.enableSelection) { return; }
    this.selected = true;
    this.selectedColor = color;
    this.colorChange.emit(color);
  }
}
