import { Component } from '@angular/core';

export interface OrganInfo {
  name: string;
  url?: string;
  leftRight: boolean;
  genderToggle: boolean;
}

export interface OrganSettings {
  name?: string;
  gender?: string;
  side?: string;
}

@Component({
  selector: 'ccf-organ-selector',
  templateUrl: './organ-selector.component.html',
  styleUrls: ['./organ-selector.component.scss']
})
export class OrganSelectorComponent {

  onLeft = true;
  onRight = false;

  organList: OrganInfo[] = [
    {name: 'A', leftRight: true, genderToggle: true},
    {name: 'B', leftRight: true, genderToggle: false},
    {name: 'C', leftRight: false, genderToggle: true},
    {name: 'D', leftRight: false, genderToggle: false},
    {name: 'E', leftRight: false, genderToggle: true},
    {name: 'F', leftRight: true, genderToggle: false},
    {name: 'G', leftRight: false, genderToggle: false}
  ];

  organSettings: OrganSettings = {
    name: '',
    gender: '',
    side: ''
  };

  shift(dir: string, step: number): void {
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    if (val === 0 && dir === 'left') {
      return;
    } else if (val === step*(5 - this.organList.length) && dir === 'right') {
      return;
    }
    val = dir === 'right' ? val -= step : val += step;
    element.style.left = val+'px';
    this.onLeft = val === 0 ? true : false;
    this.onRight = val === step*(5 - this.organList.length) ? true : false;
  }

  selectOrgan(icon: OrganInfo): void {
    this.organSettings.name = icon.name;
    console.log(this.organSettings);
  }

  isSelected(icon: OrganInfo): boolean {
    return this.organSettings.name === icon.name;
  }

}
