import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit
} from '@angular/core';
import { NodeDragEvent } from 'ccf-body-ui';
import { ResizeSensor } from 'css-element-queries';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';


/**
 * Main content component
 */
@Component({
  selector: 'ccf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-content';

  @Input() disablePositionChange = false;

  readonly position$ = this.model.position$.pipe(
    map(p => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) }))
  );

  /** Whether the view type is 3d or register */
  readonly is3DView$ = this.model.viewType$.pipe(
    map(type => type === '3d')
  );

  readonly bounds$ = this.model.organDimensions$.pipe(
    map(dims => ({
      x: Math.max(dims.x, this.model.defaultPosition.x + 40) / 1000,
      y: Math.max(dims.y, this.model.defaultPosition.y + 40) / 1000,
      z: Math.max(dims.z, this.model.defaultPosition.z + 40) / 1000
    })),
    distinctUntilKeyChanged('x'),
    distinctUntilKeyChanged('y')
  );

  /** Whether the content area is very narrow */
  isNarrowView = false;

  /**
   * Shows / hides the state debug component for testing purposes.
   */
  debugMode = false;

  /**
   * Show debug buttons of content component
   */
  showDebugButtons = !environment.production;

  /** Resize detection */
  private sensor!: ResizeSensor;

  /**
   * Creates an instance of content component.
   *
   * @param model The model state
   * @param page The page state
   * @param registration The registration state
   * @param rootRef Component's root element
   * @param cdr Change detector
   */
  constructor(
    readonly model: ModelState,
    readonly page: PageState,
    readonly registration: RegistrationState,
    readonly scene: SceneState,
    private readonly rootRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef
  ) { }

  /**
   * Sets up the resize sensor
   */
  ngOnInit(): void {
    this.sensor = new ResizeSensor(this.rootRef.nativeElement, ({ width }) => {
      const isNarrowView = width < 440; // 27.5rem
      if (this.isNarrowView !== isNarrowView) {
        this.isNarrowView = isNarrowView;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Detaches the resize sensor
   */
  ngOnDestroy(): void {
    this.sensor.detach();
  }

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
   * Resets to initial registration state if provided
   */
  resetStage(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.setToInitialRegistration();
    } else {
      this.model.setOrganDefaults();
    }
    this.model.setViewSide('anterior');
    this.model.setViewType('register');
  }

  handleNodeDrag(event: NodeDragEvent): void {
    if (event.node['@id'] === '#DraftPlacement') {
      if (event.info.coordinate) {
        const [a, b] = (event.info.coordinate as number[]).map(n => n * 1000) as [number, number];
        const { position, viewSide, organDimensions } = this.model.snapshot;
        const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map(n => n / 2);
        let newPosition = position;
        switch (viewSide) {
          case 'anterior':
            newPosition = { x: a + dims[0], y: b + dims[1], z: position.z };
            break;
          case 'posterior':
            newPosition = { x: -a + dims[0], y: b + dims[1], z: position.z };
            break;
          case 'left':
            newPosition = { x: position.x, y: b + dims[1], z: -a + dims[2] };
            break;
          case 'right':
            newPosition = { x: position.x, y: b + dims[1], z: a + dims[2] };
            break;
        }
        this.model.setPosition(newPosition);
      }
    }
  }
}
