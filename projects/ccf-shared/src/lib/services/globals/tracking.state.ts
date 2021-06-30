import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';


export interface PageStateModel {
  allowTelemetry?: boolean;
}

export const LOCAL_STORAGE_ALLOW_TELEMETRY_KEY = 'ALLOW_TELEMETRY';
export const INITIAL_TELEMETRY_SETTING  = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY) === null ? undefined
  : localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY)?.toLowerCase() === 'true';

@StateRepository()
@State<PageStateModel>({
  name: 'tracking',
  defaults: {
    allowTelemetry: INITIAL_TELEMETRY_SETTING
  }
})
@Injectable()
export class TrackingState extends NgxsImmutableDataRepository<PageStateModel> {

  @DataAction()
  setAllowTelemetry(allowTelemetry: boolean): void {
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY, allowTelemetry.toString());
    this.ctx.patchState({ allowTelemetry });

    // This ensures that if telemetry is disabled that it _WONT_ send anything to Google Analytics
    location.reload();
  }
}