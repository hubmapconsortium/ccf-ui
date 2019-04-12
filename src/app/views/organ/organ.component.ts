import { Component, OnInit } from '@angular/core';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

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
   * Organ image path of organ component displays corresponding image deictated by naviagation path.
   */
  organImagePath: string;
  /**
   * Creates an instance of organ component.
   * @param organService gets metadata and organ path from the service.
   */
  constructor(private readonly organService: OrganDataService, readonly navService: NavigationService) { }

  /**
   * on init listen to changes in browser navigation path.
   */
  ngOnInit() {
    this.organService.getOrganSourcePath().subscribe((image: string) => {
      this.organImagePath = image;
    });
  }
}
