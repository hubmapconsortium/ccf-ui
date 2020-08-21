import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-extraction-sites-menu',
  templateUrl: './extraction-sites-menu.component.html',
  styleUrls: ['./extraction-sites-menu.component.scss']
})
export class ExtractionSitesMenuComponent {

  @HostBinding('class') readonly clsName = 'ccf-extraction-sites-menu';

}
