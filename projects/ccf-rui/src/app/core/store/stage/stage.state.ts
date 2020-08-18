import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { pluck } from 'rxjs/operators';


export interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}

export interface SlicesConfig {
  thickness: number;
  numSlices: number;
}

export interface StageStateModel {
  blockSize: XYZTriplet;
  rotation: XYZTriplet;
  slicesConfig: SlicesConfig;
}


@StateRepository()
@State<StageStateModel>({
  name: 'stage',
  defaults: {
    blockSize: { x: 10, y: 10, z: 10 },
    rotation: { x: 0, y: 0, z: 0 },
    slicesConfig: { thickness: NaN, numSlices: NaN }
  }
})
@Injectable()
export class StageState extends NgxsImmutableDataRepository<StageStateModel> {
  readonly blockSize$ = this.state$.pipe(pluck('blockSize'));
  readonly rotation$ = this.state$.pipe(pluck('rotation'));
  readonly slicesConfig$ = this.state$.pipe(pluck('slicesConfig'));

  @DataAction()
  updateBlockSize(blockSize: XYZTriplet): void {
    this.ctx.patchState({ blockSize });
  }

  @DataAction()
  updateRotation(rotation: XYZTriplet): void {
    this.ctx.patchState({ rotation });
  }

  @DataAction()
  updateSlicesConfig(slicesConfig: SlicesConfig): void {
    this.ctx.patchState({ slicesConfig });
  }
}
