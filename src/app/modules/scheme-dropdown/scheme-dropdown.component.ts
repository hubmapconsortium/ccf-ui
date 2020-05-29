import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ColorScheme, ColorSchemeSelection, DEFAULT_COLOR_SCHEMES } from '../../modules/color-scheme/color-schemes';

/**
 * Scheme dropdown menu (for the Layers section)
 */
@Component({
  selector: 'ccf-scheme-dropdown',
  templateUrl: './scheme-dropdown.component.html',
  styleUrls: ['./scheme-dropdown.component.scss']
})
export class SchemeDropdownComponent implements OnInit {

  /**
   * All scheme options available
   */
  @Input() schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;

  /**
   * Current color scheme
   */
  @Input() colorScheme: ColorScheme = DEFAULT_COLOR_SCHEMES[0];

  /**
   * Emits ColorSchemeSelection of a selected scheme
   */
  @Output() schemeChange = new EventEmitter<ColorScheme>();

  /**
   * Index of the currently selected scheme
   */
  schemeIdx = 0;

  /**
   * Filters out scheme options to include only discrete schemes
   */
  ngOnInit(): void {
    this.schemeOptions = this.schemeOptions.filter(scheme => scheme.type === 'discrete');
  }

  /**
   * Updates the current scheme index and emits the currently selected scheme
   */
  schemeChanged(idx: number) {
    this.colorScheme = this.schemeOptions[idx];
    this.schemeIdx = idx;
    this.schemeChange.emit(this.colorScheme);
  }

}
