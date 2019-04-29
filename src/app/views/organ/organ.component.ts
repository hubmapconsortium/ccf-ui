import { Component, OnInit } from '@angular/core';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { TissueSample } from 'src/app/shared/state/database/database.models';
import { Observable } from 'rxjs';

/**
 * Component organ view component.
 */
@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})

export class OrganComponent implements OnInit {
  /**
   * Tissue samples of organ component used to display overlays on organ.
   */
  tissueSamples: TissueSample[];
  /**
   * Tissue sample metadata of organ component displays metadata on hover of overlay.
   */
  tissueSampleMetadata: { [label: string]: string }[];
  /**
   * Organ image path of organ component displays corresponding image deictated by naviagation path.
   */
  organImagePath: string;
  /**
   * Creates an instance of organ component.
   * @param organService gets metadata and organ path from the service.
   */

  /**
   * Creates an instance of organ component.
   * @param organService to get data of organ.
   */
  constructor(public readonly organService: OrganDataService) { }

  /**
   * on init listen to changes in browser navigation path and render organ stuff accordingly.
   */
  ngOnInit() {
    this.getOrganImageSourcePath();
    this.organService.getActiveOrgan().subscribe(d => {
      this.getTissueSamples(d.id);
    });
  }

  /**
   * Gets organ image source path displays organ image.
   */
  getOrganImageSourcePath() {
    this.organService.getOrganSourcePath().subscribe(image => {
      this.organImagePath = image;
    });
  }

  /**
   * Gets tissue samples gets list of tissues samples.
   */
  getTissueSamples(organId: string) {
    this.organService.getAllTissueSamples(organId).subscribe(d => {
      this.tissueSamples = d;
      console.log(d);
    });
  }

  /**
   * on overlay, display metadata.
   * @param tissueSampleId id of tissue sample on which hovered.
   */
  onTissueSampleMouseenter(tissueSampleMetadata: { [label: string]: string }) {
      this.tissueSampleMetadata = [tissueSampleMetadata];
  }
}
