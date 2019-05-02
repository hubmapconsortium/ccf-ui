import { ConnectedPosition, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ccf-callout, [ccf-callout]',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss']
})
export class CalloutComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() boundary: SVGGraphicsElement;
  @Input() centroid: SVGGraphicsElement;

  @ViewChild(CdkPortal) portal: CdkPortal;

  linePath: string;

  private overlayRef: OverlayRef;

  constructor(private element: ElementRef, private overlay: Overlay) {
    const position: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({ positionStrategy });
  }

  ngAfterViewInit() {
    setTimeout(() => this.update(), 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('boundary' in changes || 'centroid' in changes) {
      this.update();
    }
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  private update(): void {
    const { boundary, centroid, overlayRef, portal } = this;
    if (!this.isValidSvgElement(boundary) || !this.isValidSvgElement(centroid)) {
      overlayRef.detach();
      setTimeout(() => this.update(), 50);
      return;
    } else if (!overlayRef.hasAttached()) {
      overlayRef.attach(portal);
    }

    const [x, y] = this.getCenter(this.centroid);
    const [mid] = this.getCenter(this.boundary);
    const position = x <= mid ? 'left' : 'right';
    const positionStrategy = this.createPositionStrategy(position);

    this.linePath = this.createLinePath(x, y, position);
    overlayRef.updatePositionStrategy(positionStrategy);
    setTimeout(() => overlayRef.updatePosition(), 10);
  }

  private isValidSvgElement(element: SVGGraphicsElement): boolean {
    if (!element) { return false; }
    const { x, y, width, height } = element.getBBox();
    return x !== 0 && y !== 0 && width !== 0 && height !== 0;
  }

  private getCenter(element: SVGGraphicsElement): [number, number] {
    const { x, y, width, height } = element.getBBox();
    return [x + width / 2, y + height / 2];
  }

  private createPositionStrategy(position: 'left' | 'right'): PositionStrategy {
    const connectedPosition: ConnectedPosition = {
      originX: position === 'left' ? 'start' : 'end',
      originY: 'center',
      overlayX: position === 'left' ? 'end' : 'start',
      overlayY: 'center'
    };
    return this.overlay.position().flexibleConnectedTo(this.element).withPositions([connectedPosition]);
  }

  private createLinePath(x: number, y: number, position: 'left' | 'right'): string {
    const bbox = this.boundary.getBBox();
    const boundary = position === 'left' ? bbox.x : bbox.x + bbox.width;
    const path = `M ${x} ${y} L ${boundary} ${y}`;
    return path;
  }
}
