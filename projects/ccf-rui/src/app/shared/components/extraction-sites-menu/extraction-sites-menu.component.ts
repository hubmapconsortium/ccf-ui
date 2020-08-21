import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export interface ExtractionSite {
  name: string;
  selected: boolean;
  highlighted: boolean;
  iconSrc: string;
}

@Component({
  selector: 'ccf-extraction-sites-menu',
  templateUrl: './extraction-sites-menu.component.html',
  styleUrls: ['./extraction-sites-menu.component.scss']
})
export class ExtractionSitesMenuComponent {

  @HostBinding('class') readonly clsName = 'ccf-extraction-sites-menu';

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

  @Output() highlightChange = new EventEmitter<string[]>();

  toggleSite(site: ExtractionSite): void {
    site.selected = !site.selected;
    if (site.highlighted) {
      return;
    } else {
      this.highlight(site);
    }
  }

  highlight(site: ExtractionSite): void {
    site.highlighted = true;
    site.iconSrc = site.highlighted ? 'app:visibility_on' : 'app:visibility_off';
    this.highlightChange.emit(this.extractionSites.filter(x => x.highlighted).map(entry => entry.name));
  }

  hoverOut(site: ExtractionSite): void {
    site.highlighted = site.selected ? true : false;
    site.iconSrc = site.highlighted ? 'app:visibility_on' : 'app:visibility_off';
    this.highlightChange.emit(this.extractionSites.filter(x => x.highlighted).map(entry => entry.name));
  }

}
