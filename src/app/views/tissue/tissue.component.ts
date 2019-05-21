import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { capitalize as loCapitalize } from 'lodash';
import openSeaDragon from 'openseadragon';
import { Observable, Subscription } from 'rxjs';
import { mergeAll, mergeMap, take } from 'rxjs/operators';
import { TissueOverlay } from 'src/app/shared/state/database/database.models';
import { svgOverlay } from 'svg-overlay';

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
  private tissueSourcePathSubscription: Subscription;
  /**
   * Tissue metadata subscription for the observable returned from the data-service with tissue-metadata
   */
  private tissueMetadataSubscription: Subscription;
  /**
   * openseadragon viewer reference
   */
  private viewer: any;

  private overlaysSubsription: Subscription;

  private tissueOverlays$: Observable<TissueOverlay[]>;
  /**
   * Tissue metadata
   */
  tissueMetadata: { [label: string]: string }[];
  /**
   * Organ name
   */
  organName: string;
  /**
   * Reference to 'tissueView' element view-child
   */
  @ViewChild('tissueView') tissueView: ElementRef;

  /**
   * Creates an instance of tissue component.
   * @param tissueDataService instance of TissueDataService
   */
  constructor(private readonly tissueDataService: TissueDataService,
    private readonly renderer: Renderer2,
    private readonly http: HttpClient) {
      console.log(svgOverlay);
  }

  /**
   * on init lifecycle hook for this component - instantiates a subscription object for the
   * observable with tissue source path from the data service
   */
  ngOnInit() {
    this.tissueOverlays$ = this.tissueDataService.getTissueOverlays();
    this.tissueSourcePathSubscription = this.tissueDataService.getTissueSourcePath()
      .subscribe(path => this.launchTissueViewer(path));
    this.tissueMetadataSubscription = this.tissueDataService.getMetadata()
    // enclosed metadata inside array becasue @Input of metadata component expects array.
      .subscribe(metadata => { this.tissueMetadata = [metadata]; });
    this.tissueDataService.getOrganName().subscribe((name) => this.organName = loCapitalize(name));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    return headers;
  }

  private setOverlays(): void {
    const headers = this.getHeaders();
    const result = this.tissueOverlays$.pipe(mergeAll(), mergeMap(overlay => this.http.get(
      overlay.overlayUrl, { headers, responseType : 'text' })));
    const svgOverlays  = this.viewer.svgOverlay();
    const el = this.renderer.selectRootElement(svgOverlays.node());
    const parser = new DOMParser();
    this.overlaysSubsription = result.pipe(take(1)).subscribe((overlaySvg) => {
      const doc = parser.parseFromString(overlaySvg, 'image/svg+xml');
      // const doc = parser.parseFromString('<rect></rect>', 'image/svg+xml');
      // doc.documentElement.setAttribute('style', 'color:red; border: 1px solid blue;');
      // Trying different values to see if overlay is displayed on the screen.
      doc.documentElement.setAttribute('x', '0.5');
      doc.documentElement.setAttribute('y', '0.5');
      doc.documentElement.setAttribute('height', '100');
      doc.documentElement.setAttribute('width', '100');
      el.append(doc.documentElement);
    });

  }

  /**
   * Launches tissue viewer
   * @param tissueSourcePath tissue-source-path string returned from the data service
   */
  launchTissueViewer(tissueSourcePath: string): void {
    if (this.viewer) {
      this.viewer.destroy();
    }

    this.viewer = openSeaDragon({
      element: this.tissueView.nativeElement,
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/',
      tileSources: tissueSourcePath,
      showNavigator: true,
      navigatorPosition: 'ABSOLUTE',
      navigatorTop: '2.5rem',
      navigatorLeft: '0.25rem',
      navigatorHeight: '3.5rem',
      navigatorWidth: '4.5rem',
      defaultZoomLevel: 1,
      visibilityRatio: 1
    });

    this.setOverlays();
  }

  /**
   * on destroy lifecycle hook of this component - unsubscribes to subscriptions
   */
  ngOnDestroy() {
    if (this.tissueSourcePathSubscription) {
      this.tissueSourcePathSubscription.unsubscribe();
    }

    if (this.tissueMetadataSubscription) {
      this.tissueMetadataSubscription.unsubscribe();
    }

    if (this.overlaysSubsription) {
      this.overlaysSubsription.unsubscribe();
    }

    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  showTissueOverlay(overlay: TissueOverlay) {
    // Called when you hover over the buttons that display labels of different tissue overlays.
  }
}
