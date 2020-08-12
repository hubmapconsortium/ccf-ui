import { Component } from '@angular/core';

export interface OrganInfo {
  name: string;
  url?: string;
  leftRight: boolean;
  genderToggle: boolean;
}

@Component({
  selector: 'ccf-organ-selector',
  templateUrl: './organ-selector.component.html',
  styleUrls: ['./organ-selector.component.scss']
})
export class OrganSelectorComponent {

  organList: OrganInfo[] = [
    {name: 'A', leftRight: true, genderToggle: true},
    {name: 'B', leftRight: true, genderToggle: false},
    {name: 'C', leftRight: false, genderToggle: true},
    {name: 'D', leftRight: false, genderToggle: false},
    {name: 'E', leftRight: false, genderToggle: true},
    {name: 'F', leftRight: true, genderToggle: false}
  ];

  shift(dir: string, step: number): void {
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    if (val === 0 && dir === 'right') {
      return;
    } else if (-val === step*(this.organList.length - 5) && dir === 'left') {
      return;
    }
    val = dir === 'left' ? val -= step : val += step;
    element.style.left = val+'px';
  }

}
