import { Component } from '@angular/core';
import { AboutModalService } from 'src/app/shared/services/about-modal.service';

@Component({
  selector: 'ccf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private readonly aboutModalService: AboutModalService) { }

  close() {
    this.aboutModalService.closeAbout();
  }
}
