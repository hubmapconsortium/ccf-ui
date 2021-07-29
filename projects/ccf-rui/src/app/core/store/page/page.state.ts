/* eslint-disable @typescript-eslint/member-ordering */
import { Immutable } from '@angular-ru/common/typings';
import { Inject, Injectable, Injector } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { pluck } from 'rxjs/operators';

import { GLOBAL_CONFIG, GlobalConfig } from '../../services/config/config';
import { ModelState } from './../model/model.state';


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

  private model: ModelState;

  /**
   * Creates an instance of page state.
   *
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly injector: Injector,
    @Inject(GLOBAL_CONFIG) private readonly globalConfig: GlobalConfig
  ) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.model = this.injector.get(ModelState);

    const { globalConfig: { user, register, cancelRegistration } } = this;
    this.ctx.setState(patch<Immutable<PageStateModel>>({
      registrationCallbackSet: !!(register),
      useCancelRegistrationCallback: !!(cancelRegistration)
    }));
    if (user) {
      this.ctx.setState(patch<Immutable<PageStateModel>>({
        user: iif(!!user, user)
      }));
    }
  }

  cancelRegistration(): void {
    const { globalConfig: { cancelRegistration: cancelRegistrationCallback }, snapshot } = this;

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
