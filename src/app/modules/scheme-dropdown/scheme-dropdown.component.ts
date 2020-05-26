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
  closed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.colorScheme);
    this.schemeOptions = this.schemeOptions.filter(scheme => scheme.type === 'discrete');
  }

  schemeChanged(scheme: ColorScheme) {
    if (this.colorScheme === scheme) {
      this.closed = true;
    } else {
      this.colorScheme = scheme;
      this.closed = false;

    }
  }

}
