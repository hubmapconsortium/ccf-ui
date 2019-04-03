import { Component } from '@angular/core';
import { AboutModalService } from '../../shared/services/about-modal.service';

@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private readonly aboutModalService: AboutModalService) { }

  openAboutModal() {
    this.aboutModalService.openAbout();
  }
}
