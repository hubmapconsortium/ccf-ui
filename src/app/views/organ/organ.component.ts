import { Component, OnInit } from '@angular/core';
import { CountMetadata, OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';
import { TissueSample } from 'src/app/shared/state/database/database.models';

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
   * Organ id of organ component
   */
  organId: string;
  /**
   * Count metadata of organ component
   */
  countMetadata: CountMetadata;
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
  constructor(public readonly organService: OrganDataService) { }

  /**
   * on init listen to changes in browser navigation path and render organ stuff accordingly.
   */
  ngOnInit() {
    this.getOrganImageSourcePath();
    this.organService.getActiveOrgan().subscribe(d => {
      this.organId = d.id;
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
    });
  }

  /**
   * on overlay, display metadata.
   * @param tissueSampleId id of tissue sample on which hovered.
   */
  onTissueSampleMouseenter(tissueSampleMetadata: { [label: string]: string }) {
    this.tissueSampleMetadata = [tissueSampleMetadata];
    this.countMetadata = this.organService.getCounts(this.organId);
    this.countMetadata.tissueSamples = this.tissueSamples ? this.tissueSamples.length : 0;
  }
}
