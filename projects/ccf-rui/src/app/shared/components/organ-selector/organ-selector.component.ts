import { Component } from '@angular/core';

export interface OrganInfo {
  name: string;
  url?: string;
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
    {name: 'Bladder', url: '../../../assets/icons-organs_bladder.svg'},
    {name: 'Brain', url: '../../../assets/icons-organs_brain.svg'},
    {name: 'Colon', url: '../../../assets/icons-organs_colon.svg'},
    {name: 'Heart', url: '../../../assets/icons-organs_heart.svg'},
    {name: 'Kidney', url: '../../../assets/icons-organs_kidney.svg'},
    {name: 'Liver', url: '../../../assets/icons-organs_liver.svg'},
    {name: 'Lung', url: '../../../assets/icons-organs_lung.svg'},
    {name: 'Lymph Nodes', url: '../../../assets/icons-organs_lymph-nodes.svg'},
    {name: 'Ovaries', url: '../../../assets/icons-organs_ovaries.svg'},
    {name: 'Small Intestine', url: '../../../assets/icons-organs_small intestine.svg'},
    {name: 'Spleen', url: '../../../assets/icons-organs_spleen.svg'},
    {name: 'Stomach', url: '../../../assets/icons-organs_stomach.svg'},
    {name: 'Thymus', url: '../../../assets/icons-organs_thymus.svg'}
  ];

  selectedOrgan: string;

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
    this.selectedOrgan = icon.name;
    console.log(this.selectedOrgan);
  }

  isSelected(icon: OrganInfo): boolean {
    return this.selectedOrgan === icon.name;
  }

}
