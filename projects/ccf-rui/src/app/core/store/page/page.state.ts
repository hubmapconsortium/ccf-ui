import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { GlobalsService } from 'ccf-shared';
import { pluck } from 'rxjs/operators';


export interface Person {
  firstName: string;
  lastName: string;
}

export interface PageStateModel {
  embedded: boolean;
  homeUrl: string;
  user: Person;
}


@StateRepository()
@State<PageStateModel>({
  name: 'page',
  defaults: {
    embedded: false,
    homeUrl: 'https://hubmapconsortium.org/',
    user: {
      firstName: '',
      lastName: ''
    }
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  readonly embedded$ = this.state$.pipe(pluck('embedded'));
  readonly homeUrl$ = this.state$.pipe(pluck('homeUrl'));
  readonly user$ = this.state$.pipe(pluck('user'));

  constructor(private globals: GlobalsService) {
    super();
  }

  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.ctx.patchState({
      // TODO: Check correct property + load homeUrl + load user if embedded
      embedded: this.globals.get('hideSignupScreen', false)
    });
  }

  @DataAction()
  setEmbedded(embedded: boolean, url?: string): void {
    this.ctx.patchState({
      embedded,
      homeUrl: url ?? this.ctx.getState().homeUrl
    });
  }

  @DataAction()
  setUserName(name: Pick<Person, 'firstName' | 'lastName'>): void {
    this.ctx.setState(patch({
      user: patch(name)
    }));
  }
}
