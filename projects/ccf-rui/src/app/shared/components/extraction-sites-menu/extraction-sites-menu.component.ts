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
    {name: 'A', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'B', selected: true, highlighted: true, iconSrc: 'app:visibility_on'}
  ];

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
  }

  hoverOut(site: ExtractionSite): void {
    site.highlighted = site.selected ? true : false;
    site.iconSrc = site.highlighted ? 'app:visibility_on' : 'app:visibility_off';
  }

}
