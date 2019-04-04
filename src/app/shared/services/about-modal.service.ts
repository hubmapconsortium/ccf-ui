import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutComponent } from '../../components/about/about.component';


/**
 * Injectable to provide in root.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * The service that is responsible for operations on the modal, like opening the modal and closing it.
 */
export class AboutModalService {


  /**
   * Creates an instance of about modal service.
   * @param aboutModal Instance of MatDialog from Angular Material.
   */
  constructor(private readonly aboutModal: MatDialog) { }

  /**
   * Opens About modal.
   */
  openAbout(): void {
    this.aboutModal.open(AboutComponent, {
      width: '50rem'
    });
  }


  /**
   * Closes About modal.
   */
  closeAbout(): void {
    this.aboutModal.closeAll();
  }

}
