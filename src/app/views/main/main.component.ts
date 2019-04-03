import { Component } from '@angular/core';
import { AboutModalService } from 'src/app/shared/services/about-modal.service';

@Component({
  selector: 'ccf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private readonly aboutModalService: AboutModalService) { }
  }

  openAbout(): void {
    this.aboutModalService.openAbout();
  }

  closeAbout(): void {
    this.aboutModalService.closeAbout();
}
