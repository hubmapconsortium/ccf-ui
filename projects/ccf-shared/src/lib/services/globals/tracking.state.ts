import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';


export interface TrackingStateModel {
  allowTelemetry?: boolean;
}

export const LOCAL_STORAGE_ALLOW_TELEMETRY_KEY = 'ALLOW_TELEMETRY';
export const INITIAL_TELEMETRY_SETTING  = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY) === null ? undefined
  : localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY)?.toLowerCase() === 'true';

@StateRepository()
@State<TrackingStateModel>({
  name: 'tracking',
  defaults: {
    allowTelemetry: INITIAL_TELEMETRY_SETTING
  }
})
@Injectable()
export class TrackingState extends NgxsImmutableDataRepository<TrackingStateModel> {

  @DataAction()
  setAllowTelemetry(allowTelemetry: boolean): void {
    const oldValue = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY);
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY, allowTelemetry.toString());
    this.ctx.patchState({ allowTelemetry });
    if (oldValue && oldValue !== allowTelemetry.toString()) {
      // This ensures that if telemetry is disabled that it _WONT_ send anything to Google Analytics
      location.reload();
    }
  }
}
