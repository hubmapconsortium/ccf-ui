import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Contains the organ name and url of the icon svg
 */
export interface OrganInfo {

  /**
   * Name of the organ
   */
  name: string;

  /**
   * Url of the icon svg
   */
  url: string;
}

/**
 * Organ carousel for selecting the organ to be viewed
 */
@Component({
  selector: 'ccf-organ-selector',
  templateUrl: './organ-selector.component.html',
  styleUrls: ['./organ-selector.component.scss']
})
export class OrganSelectorComponent {

  /**
   * Emits the name of the organ when selected
   */
  @Output() organChanged = new EventEmitter<string>();

  /**
   * Determines whether the carousel is at the beginning
   */
  onLeft = true;

  /**
   * Determines whether the carousel is at the end
   */
  onRight = false;

  /**
   * List of organs in the carousel
   */
  organList: OrganInfo[] = [
    {name: 'Bladder', url: '../../../assets/icons/icons-organs_bladder.svg'},
    {name: 'Brain', url: '../../../assets/icons/icons-organs_brain.svg'},
    {name: 'Colon', url: '../../../assets/icons/icons-organs_colon.svg'},
    {name: 'Heart', url: '../../../assets/icons/icons-organs_heart.svg'},
    {name: 'Kidney', url: '../../../assets/icons/icons-organs_kidney.svg'},
    {name: 'Liver', url: '../../../assets/icons/icons-organs_liver.svg'},
    {name: 'Lung', url: '../../../assets/icons/icons-organs_lung.svg'},
    {name: 'Lymph Nodes', url: '../../../assets/icons/icons-organs_lymph-nodes.svg'},
    {name: 'Ovaries', url: '../../../assets/icons/icons-organs_ovaries.svg'},
    {name: 'Small Intestine', url: '../../../assets/icons/icons-organs_small intestine.svg'},
    {name: 'Spleen', url: '../../../assets/icons/icons-organs_spleen.svg'},
    {name: 'Stomach', url: '../../../assets/icons/icons-organs_stomach.svg'},
    {name: 'Thymus', url: '../../../assets/icons/icons-organs_thymus.svg'}
  ];

  /**
   * Currently selected organ
   */
  selectedOrgan: string;

  /**
   * Scrolls the carousel left or right by one step.
   * Prevents scrolling past the beginning or end of the carousel.
   * @param dir Direction to be scrolled
   * @param step Size of step (px)
   */
  shift(dir: string, step: number): void {
    if (this.onLeft && dir === 'left') {
      return;
    } else if (this.onRight && dir === 'right') {
      return;
    }
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    val = dir === 'right' ? val -= step : val += step;
    element.style.left = val+'px';
    this.onLeft = val === 0 ? true : false;
    this.onRight = val === step*(5 - this.organList.length) ? true : false;
  }

  /**
   * Sets currently selected organ and emits the organ name
   * @param icon The icon selected
   */
  selectOrgan(icon: OrganInfo): void {
    this.selectedOrgan = icon.name;
    console.log(this.selectedOrgan);
    this.organChanged.emit(icon.name);
  }

  /**
   * Determines whether an icon represents the currently selected organ
   * @param icon The icon of interest
   * @returns true if selected
   */
  isSelected(icon: OrganInfo): boolean {
    return this.selectedOrgan === icon.name;
  }
}
