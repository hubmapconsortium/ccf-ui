import { Component, OnInit } from '@angular/core';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';

@Component({
  selector: 'ccf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  readonly kidney = 'kidney';
  readonly heart = 'heart';
  bodyImagePath: string;
  metaData: any;

  constructor(private readonly bodyService: BodyDataService) {}

  ngOnInit(): void {
    this.bodyService.getBodySourcePath().subscribe((image: string) => {
      this.bodyImagePath = image;
    });
    this.bodyService.getMetadata().subscribe((d) => {
      this.metaData = d;
    });
  }
}
