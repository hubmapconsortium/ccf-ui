import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export interface ExtractionSite {
  name: string;
  selected: boolean;
  src?: string;
}

@Component({
  selector: 'ccf-extraction-sites-menu',
  templateUrl: './extraction-sites-menu.component.html',
  styleUrls: ['./extraction-sites-menu.component.scss']
})
export class ExtractionSitesMenuComponent {

  @HostBinding('class') readonly clsName = 'ccf-extraction-sites-menu';

  @Input() extractionSites: ExtractionSite[] = [ {name: 'A', selected: false}, {name: 'B', selected: true}]

  selectedSites: string[];

  toggleSite(site: ExtractionSite): void {
    site.selected = !site.selected;
  }

}
