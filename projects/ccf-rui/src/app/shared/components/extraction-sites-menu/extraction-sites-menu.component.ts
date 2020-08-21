import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Interface for extraction site data
 */
export interface ExtractionSite {

  /**
   * Name of the extraction site
   */
  name: string;

  /**
   * Whether the site is currently active
   */
  selected: boolean;

  /**
   * Whether the site is currently highlighted
   */
  highlighted: boolean;

  /**
   * Src of the icon (visible or non-visible)
   */
  iconSrc: string;
}

/**
 * Menu for displaying the extraction sites for the organ
 */
@Component({
  selector: 'ccf-extraction-sites-menu',
  templateUrl: './extraction-sites-menu.component.html',
  styleUrls: ['./extraction-sites-menu.component.scss']
})
export class ExtractionSitesMenuComponent {

  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-extraction-sites-menu';

  /**
   * Extraction sites for the organ
   */
  @Input() extractionSites: ExtractionSite[] = [
    {name: 'Left atrium, appendage', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left atrium, PV inflow', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left ventricle, apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left ventricle, free wall 3cm from apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Septum, 3cm from apex including LAD', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Posterior, adjacent to coronary sinus', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium appendage', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium, AV(atrioventricular) node', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium, SA(sinoatrial) node', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right ventricle, free wall 3cm from apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'}
  ];

  /**
   * Emits the currently highlighted sites
   */
  @Output() valueChange = new EventEmitter<string[]>();

  /**
   * Sets the icon type and emits an array containing the currently highlighted sites
   * @param site Extraction site
   */
  toggleHighlight(site: ExtractionSite): void {
    site.iconSrc = site.highlighted ? 'app:visibility_on' : 'app:visibility_off';
    this.valueChange.emit(this.extractionSites.filter(x => x.highlighted).map(entry => entry.name));
  }

  /**
   * Sets highlight status of an extraction site (on mouseout or click)
   * Sets icon and emits currently highlighted sites
   * @param site Extraction site
   */
  setHighlight(site: ExtractionSite): void {
    site.highlighted = site.selected ? true : false;
    this.toggleHighlight(site);
  }

  /**
   * Toggles selected status of an extraction site on click and sets highlight status of the site
   * @param site Extraction site
   */
  toggleSelected(site: ExtractionSite): void {
    site.selected = !site.selected;
    this.setHighlight(site);
  }

  /**
   * Highlights the extraction site on hover
   * Sets icon and emits currently highlighted sites
   * @param site Extraction site
   */
  hover(site: ExtractionSite): void {
    site.highlighted = true;
    this.toggleHighlight(site);
  }
}
