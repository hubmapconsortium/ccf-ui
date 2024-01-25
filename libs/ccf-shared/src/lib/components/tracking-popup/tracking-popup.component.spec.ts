import { Shallow } from 'shallow-render';

import { TrackingPopupComponent } from './tracking-popup.component';
import { TrackingPopupModule } from './tracking-popup.module';
import { ConsentService } from 'ccf-shared/analytics';

import { ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


describe('TrackingPopupComponent', () => {
  let shallow: Shallow<TrackingPopupComponent>;
  const mockConsentService = jasmine.createSpyObj<ConsentService>(['setConsent']);

  beforeEach(() => {
    shallow = new Shallow(TrackingPopupComponent, TrackingPopupModule)
      .provide({ provide: ElementRef, useValue: {} })
      .provide({ provide: MAT_SNACK_BAR_DATA, useValue: { preClose: () => undefined } })
      .provide({ provide: ConsentService, useValue: {} })
      .mock(ConsentService, {
        ...mockConsentService,
        consent: 'not-set'
      })
      .mock(MAT_SNACK_BAR_DATA, { preClose: () => undefined });
  });

  it('dismisses the popup', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance.data, 'preClose');
    instance.dismiss();
    expect(spy).toHaveBeenCalled();
  });

  it('shows the opt-in button if allowTelemetry is undefined', async () => {
    const { instance } = await shallow.render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeTrue();
  });

  it('hides the opt-in button if allowTelemetry is true', async () => {
    const { instance } = await shallow.mock(ConsentService, { ...mockConsentService, consent: 'given' }).render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeFalse();
  });

  it('shows the opt-out button if allowTelemetry is false', async () => {
    const { instance } = await shallow.mock(ConsentService, { ...mockConsentService, consent: 'rescinded' }).render();
    instance.showButton('opt-out');
    expect(instance.showButton('opt-in')).toBeTrue();
  });

  it('submits the selection', async () => {
    const { instance } = await shallow.mock(ConsentService, { ...mockConsentService, consent: 'rescinded' }).render();
    const spy = spyOn(instance, 'dismiss');
    instance.submit(true);
    expect(spy).toHaveBeenCalled();
  });
});
