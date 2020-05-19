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
   * Position of the scheme in list of schemes
   */
  @Input() schemeIndex = 0;

  /**
   * Keeps track of which color is currently selected (from color scheme contents)
   */
  @Input() colorSelectedStatus: boolean[][] = [];

  /**
   * Output  Emits the position of a newly selected color ([scheme index, color index])
   */
  @Output() colorChange = new EventEmitter<number[]>();

  /**
   * Array for iterating through colors to be displayed
   */
  colorIndex: number[];

  /**
   * Enables dynamic styling for gradient bars
   */
  gradientstyle: string;

  /**
   * Sets the color status array, color index array, and gradient style (when applicable) on load
   */
  ngOnInit() {
    this.resetColorStatus();
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
   * Resets the color selected status array and emits the position of the newly selected color
   * @param colorpos [scheme index, color index]
   */
  colorChanged(colorpos: number[]) {
    this.resetColorStatus();
    this.colorSelectedStatus[colorpos[0]][colorpos[1]] = true;
    this.colorChange.emit(colorpos);
  }

  /**
   * Resets color status array
   */
  resetColorStatus() {
    this.colorSelectedStatus = [];
    for (let i = 0; i < 8; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
  }
}
