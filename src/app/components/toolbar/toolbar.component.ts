import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private readonly aboutModal: MatDialog) { }

   /**
   * Opens About modal.
   */
  openAboutModal(): void {
    this.aboutModal.open(AboutComponent, {
      width: '50rem'
    });
  }
}
