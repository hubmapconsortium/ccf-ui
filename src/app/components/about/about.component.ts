import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

/**
 * Component for about modal, that gives brief description of the application.
 */
@Component({
  selector: 'ccf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  /**
   * Creates an instance of about component.
   * @param aboutModalService Modal service responsible for opening and closing of the modal.
   */
  constructor(private readonly aboutModal: MatDialog) { }

  /**
   * Closes About modal.
   */
  close(): void {
    this.aboutModal.closeAll();
  }
}
