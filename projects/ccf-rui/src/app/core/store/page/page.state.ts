import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { pluckUnique } from 'ccf-shared/rxjs-ext/operators';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';
import { RegistrationState } from '../registration/registration.state';

/* eslint-disable @typescript-eslint/member-ordering */

/** A record with information about a single person */
export interface Person {
  firstName: string;
  middleName?: string;
  lastName: string;
  orcidId?: string;
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
  hasChanges: boolean;
  organOptions?: OrganInfo[];
  orcidValid: boolean;
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
    skipConfirmation: true,
    hasChanges: false,
    organOptions: [],
    orcidValid: false
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  /** Active user observable */
  readonly user$ = this.state$.pipe(map(x => x?.user));
  /** registrationStarted observable */
  readonly registrationStarted$ = this.state$.pipe(pluckUnique('registrationStarted'));
  readonly useCancelRegistrationCallback$ = this.state$.pipe(map(x => x?.useCancelRegistrationCallback));
  readonly registrationCallbackSet$ = this.state$.pipe(map(x => x?.registrationCallbackSet));
  readonly organOptions$ = this.state$.pipe(map(x => x?.organOptions));
  readonly orcidValid$ = this.state$.pipe(map(x => x?.orcidValid));

  @Computed()
  get skipConfirmation$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('skipConfirmation'));
  }

  @Computed()
  get globalSkipConfirmation$(): Observable<boolean> {
    return this.globalConfig.getOption('skipUnsavedChangesConfirmation').pipe(
      map(value => value ?? environment.skipUnsavedChangesConfirmation),
      distinctUntilChanged()
    );
  }

  @Computed()
  get hasChanges$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('hasChanges'));
  }

  /**
   * Creates an instance of page state.
   *
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly globalConfig: GlobalConfigState<GlobalConfig>,
    private readonly reg: RegistrationState
  ) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    combineLatest([this.reg.state$, this.globalConfig.config$]).pipe(
      tap(([reg, config]) => {
        this.setState(patch({
          registrationCallbackSet: reg.useRegistrationCallback ? !!config.register : false,
          useCancelRegistrationCallback: !!config.cancelRegistration,
          user: iif(!!config.user, config.user!),
          registrationStarted: config.user ?? reg.initialRegistration ? true : undefined
        }));
      })
    ).subscribe();

    this.initSkipConfirmationListeners();
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
  setUserName(name: Pick<Person, 'firstName' | 'middleName' | 'lastName'>): void {
    this.ctx.setState(patch({
      user: patch({
        firstName: name.firstName,
        lastName: name.lastName,
        middleName: name.middleName !== '' ? name.middleName : undefined
      })
    }));
  }

  /**
   * Saves ORCID id as URI
   * Sets orcidValid to true if blank, otherwise set to true if valid
   * @param id ORCID id
   */
  @DataAction()
  setOrcidId(id?: string): void {
    this.ctx.setState(patch({
      user: patch({
        orcidId: id ? this.orcidToUri(id) : undefined
      })
    }));
    this.ctx.patchState({
      orcidValid: id ? this.isOrcidValid() : true
    });
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
  setHasChanges(): void {
    const { snapshot: { registrationStarted, hasChanges } } = this;
    if (registrationStarted && !hasChanges) {
      this.ctx.patchState({
        hasChanges: true
      });
    }
  }

  @DataAction()
  clearHasChanges(): void {
    this.ctx.patchState({
      hasChanges: false
    });
  }

  private initSkipConfirmationListeners(): void {
    const updateSkipConfirmation = (skipConfirmation: boolean) => this.patchState({ skipConfirmation });

    this.globalSkipConfirmation$
      .pipe(filter(s => s))
      .subscribe(updateSkipConfirmation);

    this.hasChanges$.pipe(
      withLatestFrom(this.globalSkipConfirmation$),
      map(([hasChanges, skipConfirmation]) => skipConfirmation || !hasChanges),
      distinctUntilChanged()
    ).subscribe(updateSkipConfirmation);

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

  /**
   * Checks if current orcid value is in the valid format
   * @returns true if orcid valid or blank
   */
  isOrcidValid(): boolean {
    const orcId = this.uriToOrcid(this.snapshot.user.orcidId);
    return !!(!orcId || orcId.match('^[a-zA-Z0-9]{4}(-[a-zA-Z0-9]{4}){3}$'));
  }

  /**
   * Converts orcid URI to a regular orcid value
   * @param uri orcid uri
   * @returns orcid id
   */
  uriToOrcid(uri?: string): string {
    return uri ? uri.split('/').slice(-1)[0] : '';
  }

  /**
   * Converts orcid to URI
   * @param id orcid id
   * @returns orcid URI
   */
  private orcidToUri(id: string): string {
    const idWithHyphens = id.replace(/-/g, '').replace(/(.{1,4})/g, '$1-').slice(0, -1);
    return 'https://orcid.org/' + idWithHyphens;
  }
}
