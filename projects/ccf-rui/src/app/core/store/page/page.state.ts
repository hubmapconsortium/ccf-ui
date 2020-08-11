import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { pluck } from 'rxjs/operators';



export interface PageStateModel {
  embeded: boolean;
  homeUrl: string;
}


@StateRepository()
@State<PageStateModel>({
  name: 'page',
  defaults: {
    embeded: false,
    homeUrl: ''
  }
})
@Injectable()
export class PageState extends NgxsDataRepository<PageStateModel> {
  readonly embeded$ = this.state$.pipe(pluck('embeded'));
  readonly homeUrl$ = this.state$.pipe(pluck('homeUrl'));
}
