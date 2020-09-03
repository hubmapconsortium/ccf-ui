import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';


export interface RegistrationStateModel {
}


@StateRepository()
@State<RegistrationStateModel>({
  name: 'registration'
})
@Injectable()
export class RegistrationState extends NgxsImmutableDataRepository<RegistrationStateModel> {
}
