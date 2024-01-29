import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild,
} from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


/** Valid values for side. */
export type Side = 'left' | 'right' | 'anterior' | 'posterior' | '3D';

/** Component that allows the user to change the viewing angle and rendering mode of the stage. */
@Component({
  selector: 'ccf-stage-nav',
  templateUrl: './stage-nav.component.html',
  styleUrls: ['./stage-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageNavComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-stage-nav';

  /** Whether to use a drop down menu instead of a options bar */
  @Input()
  set useDropdownMenu(value: boolean) {
    this.isDropdownActive = value;
    this.isDropdownHidden = true;
  }

  /** Input that allows changing the current side from outside the component */
  @Input() side: Side = 'anterior';

  /** Input that allows toggling of 3D view on / off from outside the component */
  @Input() view3D = false;

  /** Output that emits whenever the current side selection changes */
  @Output() readonly sideChange = new EventEmitter<Side>();

  /** Output that emits whenever the 3D view is toggled on / off */
  @Output() readonly view3DChange = new EventEmitter<boolean>();

  /** Label for dropdown */
  @ViewChild('label', { static: true }) labelRef!: ElementRef<HTMLElement>;

  /** Options dropdown */
  @ViewChild('options', { static: true }) optionsRef!: ElementRef<HTMLElement>;

  /** Whether this component shows a dropdown menu or an options bar */
  isDropdownActive = false;

  /** Whether the dropdown menu is hidden */
  isDropdownHidden = true;

  /** Simple helper for accessing the native label element */
  private get labelEl(): HTMLElement {
    return this.labelRef.nativeElement;
  }

  /** Simple helper for accessing the native options element */
  private get optionsEl(): HTMLElement {
    return this.optionsRef.nativeElement;
  }

  /**
   * Creates an instance of stage nav component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Listens to document click event
   * Closes the popup only if user clicks outside the popup
   *
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target'])
  handleClick(target: HTMLElement): void {
    const { isDropdownHidden, labelEl, optionsEl } = this;

    if (labelEl.contains(target)) {
      this.isDropdownHidden = !isDropdownHidden;
    } else if (!optionsEl.contains(target)) {
      this.isDropdownHidden = true;
    }
  }

  /**
   * Handles the updating of the side selection and calling the event emitter
   *
   * @param selection the new selected side
   */
  updateSide(selection: Side): void {
    this.ga.event('side_update', 'stage_nav', selection);

    if (selection === '3D') {
      this.updateView(true);
    } else {
      this.updateView(false);
      this.side = selection;
      this.sideChange.emit(this.side);
    }
  }

  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   *
   * @param selection 3D (true) or Register (false)
   */
  updateView(selection: boolean): void {
    this.view3D = selection;
    this.ga.event('view_update', 'stage_nav', selection ? '3D' : 'Register');
    this.view3DChange.emit(this.view3D);
  }
}
