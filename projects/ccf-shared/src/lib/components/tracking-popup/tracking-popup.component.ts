import { Component, ElementRef, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TrackingState } from '../../services/globals/tracking.state'; 

@Component({
  selector: 'ccf-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss']
})
export class TrackingPopupComponent {

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

  showOptIn(): boolean {
    if (this.tracking.snapshot.allowTelemetry === undefined) {
      return true;
    } if (this.tracking.snapshot.allowTelemetry) {
      return false;
    } else {
      return true
    }
  }

  showOptOut(): boolean {
    if (this.tracking.snapshot.allowTelemetry === undefined) {
      return true;
    } if (!this.tracking.snapshot.allowTelemetry) {
      return false;
    } else {
      return true
    }
  }
}