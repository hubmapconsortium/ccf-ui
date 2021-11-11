import { Injectable, Injector } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { GlobalConfigState } from 'ccf-shared';
import { pluckUnique } from 'ccf-shared/rxjs-ext/operators';
import { combineLatest, Observable } from 'rxjs';
import { map, mapTo, pluck, skipUntil, startWith, take, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';
import { AnatomicalStructureTagState } from '../anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState } from '../model/model.state';

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
  skipConfirmation: boolean;
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
    registrationCallbackSet: false,
    skipConfirmation: true
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  /** Active user observable */
  readonly user$ = this.state$.pipe(pluck('user'));
  /** RegistrationStated observable */
  readonly registrationStarted$ = this.state$.pipe(pluckUnique('registrationStarted'));
  readonly useCancelRegistrationCallback$ = this.state$.pipe(pluck('useCancelRegistrationCallback'));
  readonly registrationCallbackSet$ = this.state$.pipe(pluck('registrationCallbackSet'));

  @Computed()
  get skipConfirmation$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('skipConfirmation'));
  }

  @Computed()
  private get ignoreChanges$(): Observable<boolean> {
    return combineLatest([
      this.globalConfig.getOption('skipUnsavedChangesConfirmation'),
      this.registrationStarted$
    ]).pipe(map(([globalSkip, started]) =>
      !started || (globalSkip ?? environment.skipUnsavedChangesConfirmation)
    ));
  }

  @Computed()
  private get monitoredStateChanged$(): Observable<void> {
    return combineLatest([
      this.astags.entities$,
      this.model.modelChanged$
    ]).pipe(mapTo(undefined));
  }

  @Computed()
  private get skipConfirmationSource$(): Observable<boolean> {
    return this.monitoredStateChanged$.pipe(
      skipUntil(this.registrationStarted$),
      withLatestFrom(this.ignoreChanges$),
      pluckUnique(1),
      startWith(true)
    );
  }

  private astags: AnatomicalStructureTagState;
  private model: ModelState;

  /**
   * Creates an instance of page state.
   *
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly injector: Injector,
    private readonly globalConfig: GlobalConfigState<GlobalConfig>
  ) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.astags = this.injector.get(AnatomicalStructureTagState);
    this.model = this.injector.get(ModelState);

    this.globalConfig.config$.pipe(
      take(1),
      tap(config => this.setState(patch({
        registrationCallbackSet: !!config.register,
        useCancelRegistrationCallback: !!config.cancelRegistration,
        user: iif(!!config.user, config.user!)
      })))
    ).subscribe();

    this.skipConfirmationSource$.subscribe(skipConfirmation => this.patchState({
      skipConfirmation
    }));

    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Changes you made may not be saved.';
      return event.returnValue;
    };

    this.skipConfirmation$.subscribe(skipConfirmation => {
      if (skipConfirmation) {
        removeEventListener('beforeunload', beforeUnloadListener);
      } else {
        addEventListener('beforeunload', beforeUnloadListener);
      }
    });
  }

  cancelRegistration(): void {
    const {
      globalConfig: { snapshot: { cancelRegistration: cancelRegistrationCallback } },
      snapshot: { useCancelRegistrationCallback, skipConfirmation }
    } = this;

    if (useCancelRegistrationCallback) {
      // eslint-disable-next-line no-alert
      if (skipConfirmation || confirm('Changes you made may not be saved.')) {
        cancelRegistrationCallback?.();
      }
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

  @DataAction()
  setSkipConfirmation(skipConfirmation: boolean): void {
    this.ctx.patchState({
      skipConfirmation
    });
  }
}
