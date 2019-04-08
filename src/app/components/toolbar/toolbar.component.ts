import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /**
   * Creates an instance of toolbar component.
   * @param aboutModal Angular MatDialog reference.
   */
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
