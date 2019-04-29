import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutComponent } from '../../components/about/about.component';

/**
 * Component displayed at the top of the page. Contains the HuBMAP logo and an info button.
 */
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
   *
   * @param dialog Service used to open modal dialogs.
   */
  constructor(private readonly dialog: MatDialog) { }

   /**
   * Opens the about modal dialog.
   */
  openAboutDialog(): void {
    this.dialog.open(AboutComponent, {
      width: '50rem'
    });
  }
}
