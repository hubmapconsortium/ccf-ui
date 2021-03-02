import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BodyUI, NodeDragEvent, SpatialSceneNode } from 'ccf-body-ui';
import { Subscription } from 'rxjs';

import { ModelState } from '../../core/store/model/model.state';
import { XYZTriplet } from './../../core/store/model/model.state';


/**
 * Component that handles displaying the 3D models in the stage
 */
@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit, OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-body-ui';

  // eslint-disable-next-line 
  @Input()
  get scene(): SpatialSceneNode[] {
    return this._scene;
  }

  set scene(nodes: SpatialSceneNode[]) {
    this._scene = nodes;
    this.bodyUI?.setScene(nodes);
  }

  // eslint-disable-next-line 
  @Input()
  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
    this.bodyUI?.setRotation(value);
  }

  // eslint-disable-next-line 
  @Input()
  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
    this.bodyUI?.setZoom(value);
  }

  // eslint-disable-next-line 
  @Input()
  get bounds(): XYZTriplet {
    return this._bounds;
  }

  set bounds(value: XYZTriplet) {
    this._bounds = value;
    this.zoomToBounds(value);
  }

  @Output()
  readonly rotationChange = new EventEmitter<number>();

  @Output()
  readonly nodeDrag = new EventEmitter<NodeDragEvent>();

  // eslint-disable-next-line
  @Input()
  get interactive(): boolean {
    return this._interactive;
  }

  set interactive(value: boolean) {
    this._interactive = value;
    if (this.bodyUI) {
      this.recreateBodyUI();
    }
  }

  private _interactive = true;
  private _rotation = 0;
  private _zoom = 9.5;
  private _bounds: XYZTriplet;
  private _scene: SpatialSceneNode[] = [];
  private subscriptions: Subscription[] = [];

  /**
   * Instance of the body UI class for rendering the deckGL scene
   */
  bodyUI: BodyUI;

  /**
   * Reference to the div we are using to mount the body UI to.
   */
  @ViewChild('bodyCanvas', { read: ElementRef }) bodyCanvas: ElementRef<HTMLCanvasElement>;

  constructor(readonly model: ModelState) { }

  /**
   * Performs setup required after initialization
   */
  ngAfterViewInit(): void {
    this.setupBodyUI();
  }

  zoomToBounds(bounds: XYZTriplet, margin = {x: 48, y: 48}): void {
    if (this.bodyCanvas) {
      const {width, height} = this.bodyCanvas.nativeElement;
      const pxRatio = window.devicePixelRatio;
      const zoom = Math.min(
        Math.log2((width - margin.x) / pxRatio / bounds.x),
        Math.log2((height - margin.y) / pxRatio / bounds.y)
      );
      this.zoom = zoom;
    }
  }

  /**
   * Set up required to render the body UI with the scene nodes.
   */
  private async setupBodyUI(): Promise<void> {
    const canvas = this.bodyCanvas.nativeElement;
    const bodyUI = new BodyUI({
      id: 'body-ui',
      canvas,
      zoom: this.zoom,
      target: [0, 0, 0],
      rotation: this.rotation,
      minRotationX: -75,
      maxRotationX: 75,
      interactive: this.interactive
    });
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());
    await bodyUI.initialize();
    this.bodyUI = bodyUI;
    (window as unknown as {bodyUI: unknown}).bodyUI = bodyUI;
    if (this.scene?.length > 0) {
      this.bodyUI.setScene(this.scene);
    }
    if (this.bounds) {
      this.zoomToBounds(this.bounds);
    }
    this.subscriptions = [
      this.bodyUI.sceneRotation$.subscribe((rotation) => this.rotationChange.next(rotation)),
      this.bodyUI.nodeDrag$.subscribe((event) => this.nodeDrag.emit(event))
    ];
  }

  private recreateBodyUI(): void {
    this.clearSubscriptions();
    this.bodyUI.finalize();
    this.setupBodyUI();
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }
}
