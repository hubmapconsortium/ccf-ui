import { Immutable } from '@angular-ru/common/typings';
import { Injectable } from '@angular/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { ImmutablePatchValue } from '@ngxs-labs/data/typings';
import { State } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, pluck, shareReplay } from 'rxjs/operators';


@StateRepository()
@State({
  name: 'globalConfig'
})
@Injectable()
export class GlobalConfigState<T> extends NgxsImmutableDataRepository<T> {
  @Computed()
  get config$(): Observable<Immutable<T>> {
    return this.state$.pipe(
      filter(config => config != null && Object.keys(config).length > 0),
      shareReplay(1)
    );
  }

  setConfig(config: T): void {
    this.setState(config);
  }

  patchConfig(config: ImmutablePatchValue<T>): void {
    this.patchState(config);
  }

  getProperty<R>(path: PropertyKey[]): Observable<R> {
    return this.config$.pipe(
      pluck<unknown, R>(...path as string[]),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
