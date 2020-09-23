import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { map } from 'rxjs/operators';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';


@Component({
  selector: 'ccf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-content';

  /**
   * Shows / hides the state debug component for testing purposes.
   */
  debugMode = false;

  bodyNodes: SpatialSceneNode[] = [
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

  /** Whether the view type is 3d or register */
  readonly is3DView$ = this.model.viewType$.pipe(
    map(type => type === '3d')
  );

  /**
   * Creates an instance of content component.
   *
   * @param model The model state
   * @param page The page state
   * @param registration The registration state
   */
  constructor(
    readonly model: ModelState,
    readonly page: PageState,
    readonly registration: RegistrationState
  ) { }

  /**
   * Sets view type
   *
   * @param is3DView Set view type to '3d' if this is true otherwise set it to 'register'
   */
  setViewType(is3DView: boolean): void {
    this.model.setViewType(is3DView ? '3d' : 'register');
  }

  /**
   * Method to reset registration block, crosshairs, and x,y,z information.
   */
  resetStage(): void {
    // Registration block return to starting position
    // The crosshairs return to start position
    // the x, y, z info above the gizmo goes back to zero
  }
}
