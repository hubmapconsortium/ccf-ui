/* eslint-disable @typescript-eslint/member-ordering */
import { Immutable } from '@angular-ru/common/typings';
import { Inject, Injectable } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { pluckUnique } from 'ccf-shared/rxjs-ext/operators';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GLOBAL_CONFIG, GlobalConfig } from '../../services/config/config';
import { ModelState } from './../model/model.state';


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
  /** Whether or not to show the page tutorial */
  tutorialMode: boolean;
  /** Whether or not the initial registration modal has been closed */
  registrationStarted: boolean;
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
    },
    tutorialMode: false,
    registrationStarted: false
  }
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  /** Embedded observable */
  @Computed()
  get embedded$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('embedded'));
  }
  /** Home url observable */
  @Computed()
  get homeUrl$(): Observable<string> {
    return this.state$.pipe(pluckUnique('homeUrl'));
  }
  /** Active user observable */
  @Computed()
  get user$(): Observable<Immutable<Person>> {
    return this.state$.pipe(pluckUnique('user'));
  }
  /** RegistrationStated observable */
  @Computed()
  get registrationStarted$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('registrationStarted'));
  }

  /** Tutorial mode observable */
  @Computed()
  get tutorialMode$(): Observable<boolean> {
    return combineLatest([this.embedded$, this.model.organIri$]).pipe(
      map(([embedded, organIri]) => !embedded && !organIri)
    );
  }

  /**
   * Creates an instance of page state.
   *
   * @param globalConfig The global configuration
   */
  constructor(
    private readonly model: ModelState,
    @Inject(GLOBAL_CONFIG) private readonly globalConfig: GlobalConfig
  ) {
    super();
  }

  /**
   * Initializes this service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    const { globalConfig: { embedded, homeUrl, user, tutorialMode } } = this;
    this.ctx.setState(patch<Immutable<PageStateModel>>({
      embedded: embedded ?? !!user,
      homeUrl: iif(!!homeUrl, homeUrl!),
      user: iif(!!user, user!),
      tutorialMode: !!tutorialMode
    }));
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

  /**
   * Turns tutorialMode on or off
   *
   * @param tutorialMode the state to set the mode to.
   */
  @DataAction()
  setTutorialMode(tutorialMode: boolean): void {
    this.ctx.setState(patch({ tutorialMode }));
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
