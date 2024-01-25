import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Consent, ConsentService } from 'ccf-shared/analytics';

@Component({
  selector: 'ccf-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingPopupComponent {
  @HostBinding('class') readonly clsName = 'ccf-tracking-popup';

  get allowTelemetry(): Consent {
    return this.consentService.consent;
  }

  container: HTMLElement;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    readonly consentService: ConsentService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.container = elementRef.nativeElement;
  }

  dismiss(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.data.preClose();
  }

  submit(entry: boolean): void {
    this.consentService.setConsent(entry ? 'given' : 'rescinded');
    this.dismiss();
  }

  showButton(button: 'opt-in' | 'opt-out'): boolean {
    const { allowTelemetry } = this;
    if (allowTelemetry === 'not-set') {
      return true;
    } else {
      return button === 'opt-in'
        ? allowTelemetry === 'rescinded'
        : allowTelemetry === 'given';
    }
  }
}
