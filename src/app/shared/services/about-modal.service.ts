import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutComponent } from '../../components/about/about.component';

@Injectable({
  providedIn: 'root'
})
export class AboutModalService {

  constructor(private readonly aboutModal: MatDialog) { }

  openAbout(): void {
    this.aboutModal.open(AboutComponent, {
      width: '50rem'
    });
  }

  closeAbout(): void {
    this.aboutModal.closeAll();
  }

}
