import { Component, OnInit, OnDestroy } from '@angular/core';
import * as openSeaDragon from 'openseadragon';
import { Subscription } from 'rxjs';

import { TissueDataService } from '../../shared/tissue-data/tissue-data.service';

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
   * Creates an instance of tissue component.
   * @param tissueDataService instance of TissueDataService
   */
  constructor(private tissueDataService: TissueDataService) { }

  /**
   * on init lifecycle hook for this component - instantiates a subscription object for the
   * observable with tissue source path from the data service
   */
  ngOnInit() {
    this.tissueSourcePathSubscription = this.tissueDataService.tissueSourcePath.subscribe(this.launchTissueViewer);
  }

  /**
   * Launchs tissue viewer
   * @param tissueSourcePath tissue-source-path string returned from the data service
   */
  launchTissueViewer(tissueSourcePath: string) {
    const viewer = openSeaDragon({
      id: 'tissue-viewer',
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/',
      tileSources: tissueSourcePath,
      showNavigator: true,
      navigatorPosition: 'ABSOLUTE',
      navigatorTop: '40px',
      navigatorLeft: '4px',
      navigatorHeight: '60px',
      navigatorWidth: '70px',
    });
  }

  /**
   * on destroy lifecycle hook of this component - unsubscribes to subscriptions
   */
  ngOnDestroy() {
    this.tissueSourcePathSubscription.unsubscribe();
  }
}
