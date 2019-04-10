import { Component } from '@angular/core';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { OrganMetaDataService } from '../../shared/services/organ-meta-data/organ-meta-data.service';
import { OrganMetaData } from '../../shared/state/organ-meta-data/organ-meta-data.model';

@Component({
  selector: 'ccf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  readonly kidney = 'kidney';
  readonly heart = 'heart';
  metaData: OrganMetaData;

  constructor(private navigationService: NavigationService, private organMetaDataService: OrganMetaDataService) {
    this.organMetaDataService.data.subscribe((metaData: OrganMetaData) => {
      this.metaData = metaData;
    });
   }

  navigateToOrgan(id: string): void {
   this.navigationService.navigateToOrgan(id);
  }

  showMetaData(organ: string): void {
    this.organMetaDataService.nextData(organ);
  }

  hideMetaData(): void {
    this.organMetaDataService.nextData(null);
  }
}
