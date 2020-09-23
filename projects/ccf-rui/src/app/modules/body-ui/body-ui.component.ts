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
  scene: SpatialSceneNode[] = [
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#VHFemaleOrgans',
      '@type': 'SpatialSceneNode',
      scenegraph: 'https://hubmapconsortium.github.io/hubmap-ontology/objects/VHF_United_v01_060420.glb',
      transformMatrix: new Matrix4([0.076,0,0,0,0,0.076,1.6875389974302382e-17,0,0,-1.6875389974302382e-17,0.076,0,0.49,0.034,0.11,1]),
      tooltip: 'Visual Human Female Organs',
      unpickable: true,
      _lighting: 'pbr',
      zoomBasedOpacity: true,
      color: [255,0,0,255]
    }
  ];

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
