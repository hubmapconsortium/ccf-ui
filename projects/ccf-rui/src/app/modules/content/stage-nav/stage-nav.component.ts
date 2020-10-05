import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
  ElementRef
 } from '@angular/core';

import { ResizeSensor } from 'css-element-queries';

/** Valid values for side. */
export type Side = 'left' | 'right' | 'anterior' | 'posterior';

/** Component that allows the user to change the viewing angle and rendering mode of the stage. */
@Component({
  selector: 'ccf-stage-nav',
  templateUrl: './stage-nav.component.html',
  styleUrls: ['./stage-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageNavComponent implements AfterViewInit {

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-stage-nav';

  /** Input that allows changing the current side from outside the component */
  @Input() side: Side = 'anterior';

  /** Input that allows toggling of 3D view on / off from outside the component */
  @Input() view3D = false;

  /** Output that emits whenever the current side selection changes */
  @Output() sideChange = new EventEmitter<Side>();

  /** Output that emits whenever the 3D view is toggled on / off */
  @Output() view3DChange = new EventEmitter<boolean>();

  /** Label for dropdown */
  @ViewChild('label', { static: true, read: ElementRef }) label: ElementRef<HTMLElement>;

  /** Options dropdown */
  @ViewChild('options', { static: true, read: ElementRef }) options: ElementRef<HTMLElement>;

  /** Determines if stage nav settings are visible */
  stageNavHidden = true;

  /** Determines if the stage nav should be displayed as a dropdown menu */
  activateDropdown = false;

  /** Sensor for detecting changes in size of an element */
  private sensor: ResizeSensor;

  /**
   * Creates an instance of stage nav component.
   *
   * @param cdr Change detector
   */
  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Sets up ResizeSensor to listen to changes in top bar width and enables dropdown if below a certain width
   */
  ngAfterViewInit(): void {
    const topbar = document.getElementsByClassName('top-bar')[0] as HTMLElement;
    this.sensor = new ResizeSensor(topbar, () => {
      const width = parseInt(getComputedStyle(topbar).width, 10);
      this.activateDropdown = width < 440 ? true : false;
      this.stageNavHidden = width < 440 ? true : false;
      this.cdr.detectChanges();
    });
  }

  /**
   * Listens to document click event
   * Closes the popup only if user clicks outside the popup
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target']) // tslint:disable-line:no-unsafe-any
  handleClick(target: HTMLElement): void {
    const { stageNavHidden, label, options } = this;
    if (this.activateDropdown && (label.nativeElement.contains(target) || (!stageNavHidden && !options.nativeElement.contains(target)))) {
      this.stageNavHidden = !this.stageNavHidden;
      return;
    } else {
      return;
    }
  }

  /**
   * Handles the updating of the side selection and calling the event emitter
   * @param selection the new selected side
   */
  updateSide(selection: Side): void {
    this.side = selection;
    this.sideChange.emit(this.side);
  }

  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   * @param selection 3D (true) or Register (false)
   */
  updateView(selection: boolean): void {
    this.view3D = selection;
    this.view3DChange.emit(this.view3D);
  }
}
