import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';


export interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}

export interface StageStateModel {
  rotation: XYZTriplet;
}


@StateRepository()
@State<StageStateModel>({
  name: 'stage',
  defaults: {
    rotation: { x: 0, y: 0, z: 0 }
  }
})
@Injectable()
export class StageState extends NgxsDataRepository<StageStateModel> {
}
