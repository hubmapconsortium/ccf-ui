/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  BodyUI,
  NodeClickEvent,
  NodeDragEvent,
  SpatialSceneNode,
} from 'ccf-body-ui';
import { Subscription } from 'rxjs';

interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}

/**
 * Component that handles displaying the 3D models in the stage
 */
@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyUiComponent implements AfterViewInit, OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-body-ui';

  @Input()
  get scene(): SpatialSceneNode[] {
    return this._scene;
  }

  set scene(nodes: SpatialSceneNode[]) {
    this._scene = nodes;
    this.bodyUI?.setScene(nodes);
  }

  @Input()
  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
    this.bodyUI?.setRotation(value);
  }

  @Input()
  get rotationX(): number {
    return this._rotationX;
  }

  set rotationX(value: number) {
    this._rotationX = value;
    this.bodyUI?.setRotationX(value);
  }

  @Input()
  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
    this.bodyUI?.setZoom(value);
  }

  @Input()
  get target(): [number, number, number] {
    return this._target;
  }

  set target(value: [number, number, number]) {
    this._target = value;
    this.bodyUI?.setTarget(value);
  }

  @Input()
  get bounds(): XYZTriplet {
    return this._bounds;
  }

  set bounds(value: XYZTriplet) {
    this._bounds = value;
    this.zoomToBounds(value);
  }

  @Input()
  get camera(): string {
    return this._camera;
  }

  set camera(value: string) {
    this._camera = value;
  }

  @Output()
  readonly rotationChange = new EventEmitter<[number, number]>();

  @Output()
  readonly nodeDrag = new EventEmitter<NodeDragEvent>();

  @Output()
  readonly nodeClick = new EventEmitter<NodeClickEvent>();

  @Output()
  readonly nodeHoverStart = new EventEmitter<SpatialSceneNode>();

  @Output()
  readonly nodeHoverStop = new EventEmitter<SpatialSceneNode>();

  @Output()
  readonly initialized = new EventEmitter<void>();

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
  private _rotationX = 0;
  private _zoom = 9.5;
  private _target: [number, number, number] = [0, 0, 0];
  private _bounds!: XYZTriplet;
  private _scene: SpatialSceneNode[] = [];
  private subscriptions: Subscription[] = [];
  private _camera!: string;

  /**
   * Instance of the body UI class for rendering the deckGL scene
   */
  bodyUI!: BodyUI;

  /**
   * Reference to the div we are using to mount the body UI to.
   */
  @ViewChild('bodyCanvas', { read: ElementRef })
    bodyCanvas!: ElementRef<HTMLCanvasElement>;

  /**
   * Performs setup required after initialization
   */
  ngAfterViewInit(): void {
    this.setupBodyUI();
  }

  zoomToBounds(bounds: XYZTriplet, margin = { x: 48, y: 48 }): void {
    if (this.bodyCanvas) {
      const { width, height } = this.bodyCanvas.nativeElement;
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
      rotation: 0,
      minRotationX: -75,
      maxRotationX: 75,
      interactive: this.interactive,
      camera: this.camera,
    });
    canvas.addEventListener('contextmenu', (evt) => evt.preventDefault());
    await bodyUI.initialize();
    this.bodyUI = bodyUI;
    (window as unknown as { bodyUI: unknown }).bodyUI = bodyUI;
    if (this.scene?.length > 0) {
      this.bodyUI.setScene(this.scene);
    }
    if (this.bounds) {
      this.zoomToBounds(this.bounds);
    }
    if (this.target) {
      this.bodyUI.setTarget(this.target);
    }
    this.subscriptions = [
      this.bodyUI.sceneRotation$.subscribe((rotation) =>
        this.rotationChange.next(rotation)
      ),
      this.bodyUI.nodeDrag$.subscribe((event) => this.nodeDrag.emit(event)),
      this.bodyUI.nodeClick$.subscribe((event) => this.nodeClick.emit(event)),
      this.bodyUI.nodeHoverStart$.subscribe((event) =>
        this.nodeHoverStart.emit(event)
      ),
      this.bodyUI.nodeHoverStop$.subscribe((event) =>
        this.nodeHoverStop.emit(event)
      ),
    ];
    this.initialized.emit();
  }

  private recreateBodyUI(): void {
    this.clearSubscriptions();
    this.bodyUI.finalize();
    this.setupBodyUI();
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }
}
