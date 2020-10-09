import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BodyUI, NodeDragEvent, SpatialSceneNode } from 'ccf-body-ui';
import { Subscription } from 'rxjs';

import { ModelState } from '../../core/store/model/model.state';


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

  // tslint:disable-next-line: no-unsafe-any
  @Input()
  get scene(): SpatialSceneNode[] {
    return this._scene;
  }

  set scene(nodes: SpatialSceneNode[]) {
    this._scene = nodes;
    this.bodyUI?.setScene(nodes);
  }

  // tslint:disable-next-line: no-unsafe-any
  @Input()
  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
    this.bodyUI?.setRotation(value);
  }

  @Output()
  readonly rotationChange = new EventEmitter<number>();

  @Output()
  readonly nodeDrag = new EventEmitter<NodeDragEvent>();

  // tslint:disable-next-line: no-unsafe-any
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

  /**
   * Set up required to render the body UI with the scene nodes.
   */
  private async setupBodyUI(): Promise<void> {
    const canvas = this.bodyCanvas.nativeElement;
    const bodyUI = new BodyUI({ id: 'body-ui', canvas, target: [0, 0, 0], rotation: this.rotation, interactive: this.interactive});
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());
    await bodyUI.initialize();
    this.bodyUI = bodyUI;
    if (this.scene?.length > 0) {
      this.bodyUI.setScene(this.scene);
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
