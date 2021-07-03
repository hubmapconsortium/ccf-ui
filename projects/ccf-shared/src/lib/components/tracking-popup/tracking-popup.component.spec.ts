import { Shallow } from 'shallow-render';

import { TrackingPopupComponent } from './tracking-popup.component';
import { TrackingPopupModule } from './tracking-popup.module';
import { TrackingState } from '../../services/globals/tracking.state';

import { ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


describe('TrackingPopupComponent', () => {
  let shallow: Shallow<TrackingPopupComponent>;

  beforeEach(() => {
    const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
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

  it('shows the button if allowTelemetry is undefined', async () => {
    const { instance } = await shallow.render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeTrue();
  });

  it('shows the button if allowTelemetry is true', async () => {
    const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
    const { instance } = await shallow.mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: true}}).render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeFalse();
  });

  it('submits the selection', async () => {
    const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
    const { instance } = await shallow.mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: false}}).render();
    const spy = spyOn(instance, 'dismiss');
    instance.submit(true);
    expect(spy).toHaveBeenCalled();
  });

  it('hides the opt-in button if allowTelemetry is true', async () => {
    const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
    const { instance } = await shallow.mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: true}}).render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeFalse();
  });

  it('shows the opt-out button if allowTelemetry is false', async () => {
    const mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
    const { instance } = await shallow.mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: false}}).render();
    instance.showButton('opt-out');
    expect(instance.showButton('opt-in')).toBeTrue();
  });
});
