import { Shallow } from 'shallow-render';

import { TrackingPopupComponent } from './tracking-popup.component';
import { TrackingPopupModule } from './tracking-popup.module';
import { TrackingState } from '../../services/globals/tracking.state';

import { Component, ElementRef, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


describe('TrackingPopupComponent', () => {
  let shallow: Shallow<TrackingPopupComponent>;
  
  beforeEach(() => {
    let mockTrackingState = jasmine.createSpyObj<TrackingState>(['setAllowTelemetry']);
    shallow = new Shallow(TrackingPopupComponent, TrackingPopupModule)
      .provide({ provide: ElementRef, useValue: {} })
      .provide({ provide: MAT_SNACK_BAR_DATA, useValue: {} })
      .provide({ provide: TrackingState, useValue: {} })
      .mock(TrackingState, {
        ...mockTrackingState,
        snapshot: {allowTelemetry: undefined}
      });
  });

  it('makes the instance', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
