import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';

@Component({
  selector: 'ccf-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {

  @Input() colorScheme: ColorScheme;
  @Input() schemeOptions: ColorScheme[];
  @Input() schemeIndex: number;
  @Output() colorChange = new EventEmitter<number[]>();

  colorSelectedStatus: boolean[][] = [];
  colorIndex: number[];

  colorChanged(colorpos: number[]) {
    this.resetColorStatus();
    this.colorSelectedStatus[colorpos[0]][colorpos[1]] = true;
    this.colorChange.emit(colorpos);
  }

  ngOnInit() {
    this.resetColorStatus();
    this.colorIndex = this.colorScheme.type === 'discrete' ? [0,1,2,3,4,5,6] : [0];
  }

  resetColorStatus() {
    this.colorSelectedStatus = [];
    for (let i = 0; i < 8; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
  }
}
