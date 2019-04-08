import { Component, OnInit, OnDestroy } from '@angular/core';
import openSeaDragon from 'openseadragon';
import { Subscription } from 'rxjs';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';

/**
 * Component for viewing an individual tissue image
 */
@Component({
  selector: 'ccf-tissue',
  templateUrl: './tissue.component.html',
  styleUrls: ['./tissue.component.scss']
})
export class TissueComponent implements OnInit, OnDestroy {
  /**
   * Tissue source path subscription for the observable returned from the data-service with tissue-source-path
   */
  tissueSourcePathSubscription: Subscription;
  /**
   * Tissue metadata subscription for the observable returned from the data-service with tissue-metadata
   */
  tissueMetadataSubscription: Subscription;
  /**
   * Tissue metadata
   */
  tissueMetadata: string;

  /**
   * Creates an instance of tissue component.
   * @param tissueDataService instance of TissueDataService
   */
  constructor(private tissueDataService: TissueDataService) { }

  /**
   * on init lifecycle hook for this component - instantiates a subscription object for the
   * observable with tissue source path from the data service
   */
  ngOnInit() {
    this.tissueSourcePathSubscription = this.tissueDataService.getTissueSourcePath()
      .subscribe(path => this.launchTissueViewer(path));
    this.tissueMetadataSubscription = this.tissueDataService.getMetadata()
      .subscribe(metadata => this.tissueMetadata = metadata);
  }

  /**
   * Launchs tissue viewer
   * @param tissueSourcePath tissue-source-path string returned from the data service
   */
  launchTissueViewer(tissueSourcePath: string) {
    const viewer = openSeaDragon({
      id: 'tissue-view',
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/',
      tileSources: tissueSourcePath,
      showNavigator: true,
      navigatorPosition: 'ABSOLUTE',
      navigatorTop: '2.5rem',
      navigatorLeft: '0.25rem',
      navigatorHeight: '3.5rem',
      navigatorWidth: '4.5rem',
      defaultZoomLevel: 3,
      minZoomLevel: 1,
      visibilityRatio: 1,
    });
  }

  /**
   * on destroy lifecycle hook of this component - unsubscribes to subscriptions
   */
  ngOnDestroy() {
    this.tissueSourcePathSubscription.unsubscribe();
    this.tissueMetadataSubscription.unsubscribe();
  }
}
