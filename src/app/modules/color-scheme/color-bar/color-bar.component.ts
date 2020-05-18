import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';

@Component({
  selector: 'ccf-color-bar',
  templateUrl: './color-bar.component.html',
  styleUrls: ['./color-bar.component.scss']
})
export class ColorBarComponent implements OnInit {

  @Input() schemeOptions: ColorScheme[];
  @Input() colorScheme: ColorScheme;
  @Input() schemeIndex: number;
  @Output() colorChange = new EventEmitter<number[]>();

  gradientstyle: string;
  colorSelectedStatus: boolean[][] = [];
  colorIndex: number[];

  ngOnInit() {
    this.resetColorStatus();
    this.colorIndex = this.colorScheme.type === 'discrete' ? [0,1,2,3,4,5,6] : [0];
    this.gradientstyle = this.colorScheme.type === 'gradient' ? `linear-gradient(to right, ${this.getColor(0)} , ${this.getColor(1)}, ${this.getColor(2)})` : 'none';
  }

  getColor(coloridx: number) {
    return this.colorScheme.colors[coloridx];
  }

  colorChanged(colorpos: number[]) {
    this.resetColorStatus();
    this.colorSelectedStatus[colorpos[0]][colorpos[1]] = true;
    this.colorChange.emit(colorpos);
  }

  resetColorStatus() {
    this.colorSelectedStatus = [];
    for (let i = 0; i < 8; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
  }
}
