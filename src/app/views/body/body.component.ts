import { Component, OnInit } from '@angular/core';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { BodyOverlays } from './body-overlays';

@Component({
  selector: 'ccf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  bodyImagePath: string;
  metaData: any;

  constructor(private readonly bodyService: BodyDataService, readonly navigator: NavigationService, readonly bodyOverlays: BodyOverlays) { }

  ngOnInit(): void {
    this.bodyService.getBodySourcePath().subscribe((image: string) => {
      this.bodyImagePath = image;
    });
    this.bodyService.getMetadata().subscribe((data) => {
      this.metaData = data;
    });
  }
}
