import 'svg-overlay';

import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { capitalize } from 'lodash';
import { Viewer } from 'openseadragon';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueOverlay } from '../../shared/state/database/database.models';

const enum OverlayVisibility {
  // Note: These are used with bit operations. Do NOT change.
  Hidden = 0,
  Visible = 1,
  AlwaysVisible = 2
}

/**
 * Component for viewing an individual tissue image
 */
@Component({
  selector: 'ccf-tissue',
  templateUrl: './tissue.component.html',
  styleUrls: ['./tissue.component.scss']
})
export class TissueComponent implements AfterViewInit, OnDestroy {
  @ViewChild('viewerEl') viewerEl: ElementRef;
  @ViewChild('overlayEl') overlayEl: ElementRef;

  organName$ = this.dataService.getOrganName().pipe(map(capitalize));
  metadata$ = this.dataService.getMetadata().pipe(map(data => [data]));
  tissueOverlay$: Observable<TissueOverlay[]> = this.dataService.getTissueOverlays().pipe(share());

  viewer: any;
  overlayWidth = 0;
  overlayHeight = 0;
  overlayViewBox = '0 0 0 0';

  overlayVisibility = new WeakMap<TissueOverlay, OverlayVisibility>();

  private tileSourceSubscription: Subscription;


  constructor(
    private dataService: TissueDataService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    // This hook doesn't like changes! Do the work at a later cycle.
    setTimeout(() => {
      this.initializeViewer();
      this.tileSourceSubscription = this.dataService
        .getTissueSourcePath()
        .subscribe(path => this.viewer.open(path));
    });
  }

  ngOnDestroy() {
    this.tileSourceSubscription.unsubscribe();
    this.viewer.destroy();
  }

  displayState(cond: any): 'none' | undefined {
    return !!cond ? undefined : 'none';
  }

  isVisible(overlay: TissueOverlay): boolean {
    const visibility = this.overlayVisibility.get(overlay) || OverlayVisibility.Hidden;
    // return visibility !== 0;
    return true; // For testing
  }

  setVisibility(overlay: TissueOverlay, visibility: 'on' | 'off', always?: 'always'): void {
    const current = this.overlayVisibility.get(overlay) || OverlayVisibility.Hidden;
    const bits = always ? OverlayVisibility.AlwaysVisible : OverlayVisibility.Visible;
    // tslint:disable-next-line:no-bitwise
    const updated = visibility === 'on' ? current | bits : current & ~bits;

    this.overlayVisibility.set(overlay, updated);
  }

  private initializeViewer(): void {
    const { renderer, overlayEl, viewerEl } = this;
    // Initialize OpenSeadragon Viewer
    const viewer = this.viewer = new Viewer({
      element: viewerEl.nativeElement,
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/',
      showNavigator: true,
      navigatorPosition: 'ABSOLUTE',
      navigatorTop: '2.5rem',
      navigatorLeft: '0.25rem',
      navigatorHeight: '3.5rem',
      navigatorWidth: '4.5rem',
      defaultZoomLevel: 1,
      visibilityRatio: 1
    });

    // Add tissue overlay element
    const overlay = viewer.svgOverlay();
    renderer.appendChild(overlay.node(), overlayEl.nativeElement);

    // Setup event handling
    viewer.addHandler('open', () => this.setOverlaySize());
  }

  private setOverlaySize(): void {
    const { viewer: { viewport, world } } = this;
    const { x, y, width, height } = viewport.getBounds();
    // There should only be a single image loaded
    // There might be a better way to get this!
    const { source: { dimensions: { x: imageWidth, y: imageHeight } } } = world.getItemAt(0);

    this.overlayWidth = 2 * x + width;
    this.overlayHeight = 2 * y + height;
    this.overlayViewBox = `0 0 ${imageWidth} ${imageHeight}`;
  }
}
