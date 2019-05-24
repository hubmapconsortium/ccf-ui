import 'svg-overlay';

import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { capitalize, get } from 'lodash';
import { Viewer } from 'openseadragon';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { Scalebar } from '../../external-libraries/openseadragon-scalebar';
import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueOverlay } from '../../shared/state/database/database.models';

/**
 * Bit flags indicating the current visibility status of an overlay.
 */
const enum OverlayVisibility {
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
  /**
   * Element on to which Open Seadragon is mounted.
   */
  @ViewChild('viewerEl') viewerEl: ElementRef;

  /**
   * Top svg element of the overlays. Will be moved into Open Seadragon's view.
   */
  @ViewChild('overlayEl') overlayEl: ElementRef;

  /**
   * Observable emitting the name of the organ for the current tissue.
   */
  organName$ = this.dataService.getOrganName().pipe(map(capitalize));

  /**
   * Observable emitting the metadata for the current tissue.
   */
  metadata$ = this.dataService.getMetadata().pipe(map(data => [data]));

  /**
   * Observable emitting the overlays for the current tissue.
   */
  tissueOverlay$: Observable<TissueOverlay[]> = this.dataService.getTissueOverlays().pipe(share());

  /**
   * The Open Seadragon Viewer instance.
   * Refer to https://openseadragon.github.io/ for documentation.
   */
  viewer: any;

  /**
   * Scalebar of tissue viewer
   */
  scalebar: any;
  /**
   * Tissue metadata
   * Overlay width in viewport coordinates (0 <= width <= 1).
   */
  overlayWidth = 0;

  /**
   * Overlay height in viewport coordinates (0 <= height <= 1).
   */
  overlayHeight = 0;

  /**
   * Overlay view box in original image coordinates.
   */
  overlayViewBox = '0 0 0 0';

  /**
   * Mapping containing the current visibility state for each overlay.
   */
  private overlayVisibility = new WeakMap<TissueOverlay, OverlayVisibility>();

  /**
   * Subscription for the tile source url.
   */
  private tileSourceSubscription: Subscription;

  /**
   * Metadata subscription of tissue component
   */
  private metaDataSubscription: Subscription;

  /**
   * Pixel per meter of tissue component
   */
  private pixelPerMeter: number;

  /**
   * Creates an instance of tissue component.
   *
   * @param dataService The service used to fetch the tissue information.
   * @param renderer Used to interact with Open Seadragon's html elements.
   */
  constructor(
    private dataService: TissueDataService,
    private renderer: Renderer2
  ) { }

  /**
   * Angular's AfterViewInit hook.
   * Initializes the Open Seadragon viewer.
   */
  ngAfterViewInit() {
    // This hook doesn't like changes! Do the work at a later cycle.
    setTimeout(() => {
      this.initializeViewer();
      this.metaDataSubscription = this.metadata$.subscribe((data) => this.setScaleBar(data));
      this.tileSourceSubscription = this.dataService
        .getTissueSourcePath()
        .subscribe(path => this.viewer.open(path));
    });
  }

  /**
   * Angular's OnDestroy hook.
   * Destroys the Open Seadragon viewer and cleans up subscriptions.
   */
  ngOnDestroy() {
    this.tileSourceSubscription.unsubscribe();
    this.metaDataSubscription.unsubscribe();
    this.viewer.destroy();
  }

  /**
   * Utility function for setting the `display` attribute on an element.
   * Returns `none` when the provided condition is falsy.
   *
   * @param cond The condition on which to display/hide an element.
   * @returns `none` if `cond` is falsy else `undefined`
   */
  displayState(cond: any): 'none' | undefined {
    return !!cond ? undefined : 'none';
  }

  /**
   * Determines whether an overlay is visible.
   *
   * @param overlay The overlay to test.
   * @returns `true` if the visibility is `Visible` or `AlwaysVisible`, else `false`.
   */
  isVisible(overlay: TissueOverlay): boolean {
    const visibility = this.overlayVisibility.get(overlay) || OverlayVisibility.Hidden;
    return visibility !== OverlayVisibility.Hidden;
  }

  /**
   * Sets, unsets, or toggles the visibility for an overlay.
   *
   * @param overlay The overlay on which to set the visibility.
   * @param visibility Whether to set, unset, or toggle the visibility.
   * @param [always] If present the always visible flag will be updated instead of the regular visibility flag.
   */
  setVisibility(overlay: TissueOverlay, visibility: 'on' | 'off' | 'toggle', always?: 'always'): void {
    const current = this.overlayVisibility.get(overlay) || OverlayVisibility.Hidden;
    const bits = always ? OverlayVisibility.AlwaysVisible : OverlayVisibility.Visible;
    let updated = current;

    // tslint:disable:no-bitwise
    if (visibility === 'on') {
      updated |= bits;
    } else if (visibility === 'off') {
      updated &= ~bits;
    } else {
      updated ^= bits;
    }
    // tslint:enable:no-bitwise

    this.overlayVisibility.set(overlay, updated);
  }

  /**
   * Initializes the Open Seadragon Viewer.
   */
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
      navigatorHeight: '6rem',
      navigatorWidth: '8rem',
      defaultZoomLevel: 1,
      visibilityRatio: 1
    });

    // Add tissue overlay element
    const overlay = viewer.svgOverlay();
    renderer.appendChild(overlay.node(), overlayEl.nativeElement);

    // Setup event handling
    viewer.addHandler('open', () => this.setOverlaySize());
  }

  /**
   * Sets the size and view box on the top svg overlay element.
   */
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

  /**
   * Sets instance of scalebar pluging of OpenSeaDragon
   * @param data metadata
   */
  private setScaleBar(data: { [label: string]: string | number }[]): void {
    const pixelPerMeter = get(data, [0, 'PixelPerMeter']);
    if (!isNaN(pixelPerMeter)) {
      this.scalebar = new Scalebar({
        viewer: this.viewer,
        minWidth: '100px',
        stayInsideImage: true,
        pixelsPerMeter: pixelPerMeter,
        color: 'yellow',
        fontColor: 'white'
      });
    }
  }
}
