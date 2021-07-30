import { Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { TrackingState } from '../../analytics/tracking.state';


@Component({
  selector: 'ccf-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss']
})
export class TrackingPopupComponent {
  @HostBinding('class') readonly clsName = 'ccf-tracking-popup';

  get allowTelemetry(): boolean | undefined {
    return this.tracking.snapshot.allowTelemetry;
  }

  container: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(elementRef: ElementRef<HTMLElement>, readonly tracking: TrackingState, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.container = elementRef.nativeElement;
  }

  dismiss(): void {
    this.data.preClose();
  }

  submit(entry: boolean): void {
    this.tracking.setAllowTelemetry(entry);
    this.dismiss();
  }

  showButton(button: 'opt-in' | 'opt-out'): boolean {
    const { allowTelemetry } = this;
    if (allowTelemetry === undefined) {
      return true;
    } else {
      return button === 'opt-in' ? !allowTelemetry : allowTelemetry;
    }
  }
}
