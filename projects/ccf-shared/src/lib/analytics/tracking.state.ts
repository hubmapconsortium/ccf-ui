import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';


export interface TrackingStateModel {
  allowTelemetry?: boolean;
  allowTelemetrySelected?: boolean;
}

export const LOCAL_STORAGE_ALLOW_TELEMETRY_KEY = 'ALLOW_TELEMETRY';
export const LOCAL_STORAGE_ALLOW_TELEMETRY_SELECTED_KEY = 'ALLOW_TELEMETRY_SELECTED';

// If there has not been a selection, set the initial allowTelemetry value to true.
// Otherwise, set the initial allowTelemetry value to the current localStorage ALLOW_TELEMETRY value
export const INITIAL_TELEMETRY_SETTING = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_SELECTED_KEY) === 'false' ? true
  : localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY)?.toLowerCase() === 'true';

// If there has not been a selection, set the initial allowTelemetrySelected value to false.
// Otherwise, set the initial allowTelemetrySelected value to true
export const INITIAL_TELEMETRY_SELECTED_SETTING = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_SELECTED_KEY) === 'false' ? false : true;

@StateRepository()
@State<TrackingStateModel>({
  name: 'tracking',
  defaults: {
    allowTelemetry: INITIAL_TELEMETRY_SETTING,
    allowTelemetrySelected: INITIAL_TELEMETRY_SELECTED_SETTING
  }
})
@Injectable()
export class TrackingState extends NgxsImmutableDataRepository<TrackingStateModel> {

  @DataAction()
  setAllowTelemetry(allowTelemetry: boolean): void {
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY, allowTelemetry.toString());
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_SELECTED_KEY, 'true');
    this.ctx.patchState({ allowTelemetry, allowTelemetrySelected: true });
    if (localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY) === 'false') {
      // This ensures that if telemetry is disabled that it _WONT_ send anything to Google Analytics
      location.reload();
    }
  }
}
