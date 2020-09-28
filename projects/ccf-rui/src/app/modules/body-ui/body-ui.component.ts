import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import { BodyUI, SpatialSceneNode } from 'ccf-body-ui';
import { ModelState } from '../../core/store/model/model.state';

/**
 * Component that handles displaying the 3D models in the stage
 */
@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-body-ui';

  /**
   * Spacial Scene nodes that make up the deckgl scene
   * To be replaced by a call to the store when set up
   */
  // tslint:disable-next-line: no-unsafe-any
  @Input()
  get scene(): SpatialSceneNode[] {
    return this._scene;
  }

  set scene(nodes: SpatialSceneNode[]) {
    this._scene = nodes;
    this.bodyUI?.setScene(nodes);
  }

  private _scene: SpatialSceneNode[] = [];

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
  setupBodyUI(): void {
    const canvas = this.bodyCanvas.nativeElement;
    this.bodyUI = new BodyUI({ id: 'body-ui', canvas });
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());

    setTimeout(() => {
      this.bodyUI.setScene(this.scene);
    }, 100);
  }
}
