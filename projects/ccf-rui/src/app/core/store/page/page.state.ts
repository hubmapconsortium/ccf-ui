import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { GlobalsService } from 'ccf-shared';
import { pluck } from 'rxjs/operators';


/** A record with information about a single person */
export interface Person {
  firstName: string;
  lastName: string;
}

/** Page state model */
export interface PageStateModel {
  /** Whether the page is embedded through hubmap */
  embedded: boolean;
  /** Url to go to when the user clicks the hubmap logo or back button */
  homeUrl: string;
  /** Active user */
  user: Person;
}


/**
 * General page global state
 */
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
  /** Embedded observable */
  readonly embedded$ = this.state$.pipe(pluck('embedded'));
  /** Home url observable */
  readonly homeUrl$ = this.state$.pipe(pluck('homeUrl'));
  /** Active user observable */
  readonly user$ = this.state$.pipe(pluck('user'));

  /**
   * Creates an instance of page state.
   *
   * @param globals The service used to query properties from the global object
   */
  constructor(private globals: GlobalsService) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.ctx.patchState({
      // TODO: Check correct property + load homeUrl + load user if embedded
      embedded: this.globals.get('hideSignupScreen', false)
    });
  }

  /**
   * Sets whether this is an embedded page.
   *
   * @param embedded Whether the page is embedded
   * @param [url] The new home url. If not provided the previous one is used
   */
  @DataAction()
  setEmbedded(embedded: boolean, url?: string): void {
    this.ctx.patchState({
      embedded,
      homeUrl: url ?? this.ctx.getState().homeUrl
    });
  }

  /**
   * Sets the name of the active user.
   *
   * @param name The first and last name
   */
  @DataAction()
  setUserName(name: Pick<Person, 'firstName' | 'lastName'>): void {
    this.ctx.setState(patch({
      user: patch(name)
    }));
  }
}
