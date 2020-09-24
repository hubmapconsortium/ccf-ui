import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { ResizeSensor } from 'css-element-queries';
import { RegistrationState } from '../../core/store/registration/registration.state';

/**
 * Main content component
 */
@Component({
  selector: 'ccf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements AfterViewInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-content';

  /** Whether the view type is 3d or register */
  readonly is3DView$ = this.model.viewType$.pipe(
    map(type => type === '3d')
  );

  /** Determines if the stage nav should be displayed as a dropdown menu */
  activateDropdown = false;

  /** Reference to the top bar element */
  @ViewChild('topbar', { read: ElementRef }) topBar: ElementRef<HTMLElement>;

  /** Sensor for detecting changes in size of an element */
  private sensor: ResizeSensor;

  /**
   * Creates an instance of content component.
   *
   * @param model The model state
   * @param page The page state
   * @param registration The registration state
   * @param cdr Change detector
   */
  constructor(
    readonly model: ModelState,
    readonly page: PageState,
    readonly registration: RegistrationState,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Sets up ResizeSensor to listen to changes in top bar width and enables dropdown if below a certain width
   */
  ngAfterViewInit(): void {
    const {
      topBar: { nativeElement: topBar }
    } = this;

    this.sensor = new ResizeSensor(topBar, () => {
      const width = parseInt(getComputedStyle(topBar).width, 10);
      this.activateDropdown = width < 440 ? true : false;
      this.cdr.detectChanges();
    });
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
    // Registration block return to starting position
    // The crosshairs return to start position
    // the x, y, z info above the gizmo goes back to zero
  }
}
