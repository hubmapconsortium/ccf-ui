import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';


export interface PageStateModel {
  embedded: boolean;
  homeUrl: string;
}


@StateRepository()
@State<PageStateModel>({
  name: 'page',
  defaults: {
    embedded: false,
    homeUrl: ''
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  readonly embedded$ = this.state$.pipe(pluck('embedded'));
  readonly homeUrl$ = this.state$.pipe(pluck('homeUrl'));

  constructor() {
    super();

    if (!environment.production && typeof globalThis === 'object') {
      globalThis.setEmbedded = this.setEmbedded.bind(this);
    }
  }

  @DataAction()
  setEmbedded(embedded: boolean, url?: string): void {
    this.ctx.patchState({
      embedded,
      homeUrl: url ?? this.ctx.getState().homeUrl
    });
  }
}
