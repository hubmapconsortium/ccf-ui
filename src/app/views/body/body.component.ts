import { Component, OnInit } from '@angular/core';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ccf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  bodyImagePath$: Observable<string>;
  metaData$: Observable<any>;
  bodyOverlays$: Observable<{id: string, path: string}[]>;

  constructor(private readonly bodyService: BodyDataService, readonly navigator: NavigationService) { }

  ngOnInit(): void {
    this.bodyImagePath$ = this.bodyService.getBodySourcePath();
    this.metaData$ = this.bodyService.getMetadata();
    this.bodyOverlays$ = this.bodyService.getBodyOverlays();
  }
}
