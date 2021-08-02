import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { GlobalConfigState } from 'ccf-shared';
import { pluck, take, tap } from 'rxjs/operators';

import { GlobalConfig } from '../../services/config/config';

/* eslint-disable @typescript-eslint/member-ordering */

/** A record with information about a single person */
export interface Person {
  firstName: string;
  lastName: string;
}

/** Page state model */
export interface PageStateModel {
  /** Active user */
  user: Person;
  /** Whether or not the initial registration modal has been closed */
  registrationStarted: boolean;
  useCancelRegistrationCallback: boolean;
  registrationCallbackSet: boolean;
}


/**
 * General page global state
 */
@StateRepository()
@State<PageStateModel>({
  name: 'page',
  defaults: {
    user: {
      firstName: '',
      lastName: ''
    },
    registrationStarted: false,
    useCancelRegistrationCallback: false,
    registrationCallbackSet: false
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  /** Active user observable */
  readonly user$ = this.state$.pipe(pluck('user'));
  /** RegistrationStated observable */
  readonly registrationStarted$ = this.state$.pipe(pluck('registrationStarted'));
  readonly useCancelRegistrationCallback$ = this.state$.pipe(pluck('useCancelRegistrationCallback'));
  readonly registrationCallbackSet$ = this.state$.pipe(pluck('registrationCallbackSet'));


  /**
   * Creates an instance of page state.
   *
   * @param globalConfig The global configuration
   */
  constructor(private readonly globalConfig: GlobalConfigState<GlobalConfig>) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.globalConfig.config$.pipe(
      take(1),
      tap(config => this.setState(patch({
        registrationCallbackSet: !!config.register,
        useCancelRegistrationCallback: !!config.cancelRegistration,
        user: iif(!!config.user, config.user!)
      })))
    ).subscribe();
  }

  cancelRegistration(): void {
    const { globalConfig: { snapshot: { cancelRegistration: cancelRegistrationCallback } }, snapshot } = this;

    if (snapshot.useCancelRegistrationCallback) {
      cancelRegistrationCallback?.();
    }
  }

  @DataAction()
  setUseCancelRegistrationCallback(use: boolean): void {
    this.ctx.patchState({ useCancelRegistrationCallback: use });
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

  /**
   * Sets registrationStarted to true (when initial registration modal is closed)
   */
  @DataAction()
  registrationStarted(): void {
    this.ctx.setState(patch({
      registrationStarted: true
    }));
  }
}
