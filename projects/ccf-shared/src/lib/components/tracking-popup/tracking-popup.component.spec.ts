import { Shallow } from 'shallow-render';

import { TrackingPopupComponent } from './tracking-popup.component';
import { TrackingPopupModule } from './tracking-popup.module';
import { TrackingState } from '../../analytics/tracking.state';

import { ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


describe('TrackingPopupComponent', () => {
  let shallow: Shallow<TrackingPopupComponent>;
  const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);

  beforeEach(() => {
    shallow = new Shallow(TrackingPopupComponent, TrackingPopupModule)
      .provide({ provide: ElementRef, useValue: {} })
      .provide({ provide: MAT_SNACK_BAR_DATA, useValue: {preClose: () => undefined} })
      .provide({ provide: TrackingState, useValue: {} })
      .mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: undefined}
      })
      .mock(MAT_SNACK_BAR_DATA, {preClose: () => undefined});
  });

  it('dismisses the popup', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance.data, 'preClose');
    instance.dismiss();
    expect(spy).toHaveBeenCalled();
  });

  it('shows both buttons if allowTelemetrySelected is false', async () => {
    const { instance } = await shallow.mock(TrackingState, {...mockTrackingState, snapshot: {allowTelemetrySelected: false}}).render();
    expect(instance.showButton('opt-in') && instance.showButton('opt-out')).toBeTrue();
  });

  it('shows the opt-in button if allowTelemetry is undefined', async () => {
    const { instance } = await shallow.render();
    expect(instance.showButton('opt-in')).toBeTrue();
  });

  it('hides the opt-in button if allowTelemetry is true', async () => {
    const { instance } = await shallow.mock(TrackingState, {...mockTrackingState, snapshot: {allowTelemetry: true}}).render();
    expect(instance.showButton('opt-in')).toBeFalse();
  });

  it('shows the opt-out button if allowTelemetry is false', async () => {
    const { instance } = await shallow.mock(TrackingState, {...mockTrackingState, snapshot: {allowTelemetry: false}}).render();
    expect(instance.showButton('opt-in')).toBeTrue();
  });

  it('submits the selection', async () => {
    const { instance } = await shallow.mock(TrackingState, {...mockTrackingState, snapshot: {allowTelemetry: false}}).render();
    const spy = spyOn(instance, 'dismiss');
    instance.submit(true);
    expect(spy).toHaveBeenCalled();
  });
});
