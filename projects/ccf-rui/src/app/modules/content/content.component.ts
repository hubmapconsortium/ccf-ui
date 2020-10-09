import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnDestroy, OnInit
} from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { map } from 'rxjs/operators';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';
import { environment } from './../../../environments/environment';


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

  /** Whether the view type is 3d or register */
  readonly is3DView$ = this.model.viewType$.pipe(
    map(type => type === '3d')
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
  private sensor: ResizeSensor;

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
   */
  resetStage(): void {
    this.model.setPosition({x: 200, y: 0, z: 0});
    this.model.setViewSide('anterior');
    this.model.setViewType('register');
  }
}
