import { Component, OnInit, Input } from '@angular/core';
import { ColorScheme, DEFAULT_COLOR_SCHEMES } from '../../modules/color-scheme/color-schemes';

@Component({
  selector: 'ccf-scheme-dropdown',
  templateUrl: './scheme-dropdown.component.html',
  styleUrls: ['./scheme-dropdown.component.scss']
})
export class SchemeDropdownComponent implements OnInit {

  @Input() schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;
  @Input() colorScheme: ColorScheme = DEFAULT_COLOR_SCHEMES[0];

  schemeIdx = 0;

  constructor() { }

  ngOnInit(): void {
    this.schemeOptions = this.schemeOptions.filter(scheme => scheme.type === 'discrete');
  }

  schemeChanged(n: number) {
    this.colorScheme = this.schemeOptions[n];
    this.schemeIdx = n;
  }

}
