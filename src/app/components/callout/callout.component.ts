import { ConnectedPosition, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';

/**
 * Displays a callout with arbitraty contents on a svg.
 */
@Component({
  selector: 'ccf-callout, [ccf-callout]',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss']
})
export class CalloutComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * Boundary to which the callout line should be drawn.
   */
  @Input() boundary: SVGGraphicsElement;

  /**
   * Element who's center will be used as the start of the callout line.
   */
  @Input() centroid: SVGGraphicsElement;


  /**
   * Forces the callout position to either left or right.
   */
  @Input() forcePosition: 'left' | 'right';

  /**
   * Template of the callout contents.
   */
  @ViewChild(CdkPortal) portal: CdkPortal;

  /**
   * Svg path for drawing the line.
   */
  linePath: string;

  /**
   * Controller of the overlay containing the callout contents.
   */
  private overlayRef: OverlayRef;

  /**
   * Interval id running updates.
   */
  private updater: any;

  /**
   * Creates an instance of callout component.
   *
   * @param element The path element which will be connected to the callout contents.
   * @param overlay Service used to create and configure the overlay.
   */
  constructor(private element: ElementRef, private overlay: Overlay) {
    const position: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({ positionStrategy });
  }

  /**
   * Angular's AfterViewInit hook.
   * Runs the initial update after an small delay.
   */
  ngAfterViewInit() {
    // This hook doesn't like values changing in it!? -> delay call.
    setTimeout(() => this.update(), 10);
  }

  /**
   * Angular's OnChanges hook.
   * Detects changes to boundary and centroid.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('boundary' in changes || 'centroid' in changes) {
      this.update();
    }
  }

  /**
   * Angular's OnDestroy hook.
   * Cleans up intervals, timeouts, etc., and destroys the overlay.
   */
  ngOnDestroy() {
    this.cancelUpdates();
    this.overlayRef.dispose();
  }

  /**
   * Updates the position of the callout. Creating it if needed.
   */
  private update(): void {
    const { boundary, centroid, forcePosition, overlayRef, portal } = this;
    if (!this.isValidSvgElement(boundary) || !this.isValidSvgElement(centroid)) {
      this.cancelUpdates();
      overlayRef.detach();
      setTimeout(() => this.update(), 50);
      return;
    } else if (!overlayRef.hasAttached()) {
      overlayRef.attach(portal);
    }

    const [x, y] = this.getCenter(this.centroid);
    const [mid] = this.getCenter(this.boundary);
    const position = forcePosition || (x <= mid ? 'left' : 'right');
    const positionStrategy = this.createPositionStrategy(position);

    this.linePath = this.createLinePath(x, y, position);
    overlayRef.updatePositionStrategy(positionStrategy);
    setTimeout(() => overlayRef.updatePosition(), 10);
    this.scheduleUpdates();
  }

  /**
   * Determines whether a svg element exists and has a position/dimensions.
   *
   * @param element The svg element.
   * @returns True if the element exists and has a position/dimensions.
   */
  private isValidSvgElement(element: SVGGraphicsElement): boolean {
    if (!element) { return false; }
    const { x, y, width, height } = element.getBBox();
    return x !== 0 || y !== 0 || width !== 0 || height !== 0;
  }

  /**
   * Calculates the center of a svg element.
   *
   * @param element The svg element.
   * @returns The center of the svg element's container.
   */
  private getCenter(element: SVGGraphicsElement): [number, number] {
    const { x, y, width, height } = element.getBBox();
    return [x + width / 2, y + height / 2];
  }

  /**
   * Creates a position strategy for an overlay that will connect to this' elements path.
   *
   * @param position Whether to put the overlay to the left or right of the connected element.
   * @returns A new position strategy.
   */
  private createPositionStrategy(position: 'left' | 'right'): PositionStrategy {
    const connectedPosition: ConnectedPosition = {
      originX: position === 'left' ? 'start' : 'end',
      originY: 'center',
      overlayX: position === 'left' ? 'end' : 'start',
      overlayY: 'center'
    };
    return this.overlay.position().flexibleConnectedTo(this.element).withPositions([connectedPosition]);
  }

  /**
   * Creates a svg path from a center position to the boundary.
   *
   * @param x The center x position
   * @param y The center y position
   * @param position Whether the path should go to the left or right side of the boundary.
   * @returns A svg path.
   */
  private createLinePath(x: number, y: number, position: 'left' | 'right'): string {
    const bbox = this.boundary.getBBox();
    const boundary = position === 'left' ? bbox.x : bbox.x + bbox.width;
    const path = `M ${x} ${y} L ${boundary} ${y}`;
    return path;
  }

  /**
   * Adhoc solution for updating when the search drawer is expanded/collapsed.
   * FIXME: This is really inefficient and better solutions needs to be researched.
   */
  private scheduleUpdates(): void {
    const { updater } = this;
    if (updater === undefined) {
      this.updater = setInterval(() => this.update(), 100);
    }
  }

  /**
   * Clears the update interval.
   */
  private cancelUpdates(): void {
    const { updater } = this;
    if (updater) { clearInterval(updater); }
    this.updater = undefined;
  }
}
