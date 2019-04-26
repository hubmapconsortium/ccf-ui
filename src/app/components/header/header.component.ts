import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Indicates whether the about item is currenlty being hovered over.
   */
  isAboutItemHovered = false;

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
