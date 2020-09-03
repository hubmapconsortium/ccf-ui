import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalsService } from 'ccf-shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { PageState } from './page.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}

describe('PageState', () => {
  let mockGlobals: jasmine.SpyObj<GlobalsService>;
  let state: PageState;


  beforeEach(() => {
    mockGlobals = jasmine.createSpyObj<GlobalsService>('GlobalsService', ['get']);
    mockGlobals.get.and.returnValue(false);

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([PageState])
      ],
      providers: [
        { provide: GlobalsService, useValue: mockGlobals }
      ]
    });

    TestBed.inject(Store).reset({
      page: {
        embedded: false,
        homeUrl: '/home',
        user: {
          firstName: 'Bob',
          lastName: 'the Dragon'
        }
      }
    });

    state = TestBed.inject(PageState);
  });

  it('has the latest embedded', async () => {
    const value = await nextValue(state.embedded$);
    expect(value).toEqual(false);
  });

  it('has the latest home url', async () => {
    const value = await nextValue(state.homeUrl$);
    expect(value).toEqual('/home');
  });

  it('has the latest user', async () => {
    const value = await nextValue(state.user$);
    expect(value).toEqual({ firstName: 'Bob', lastName: 'the Dragon' });
  });

  it('updates embedded', async () => {
    state.setEmbedded(true);

    const value = await nextValue(state.embedded$);
    expect(value).toEqual(true);
  });

  it('updates home url', async () => {
    state.setEmbedded(true, '/new');

    const value = await nextValue(state.homeUrl$);
    expect(value).toEqual('/new');
  });

  it('updates user name', async () => {
    const newName = { firstName: 'Alice', lastName: 'the President' };
    state.setUserName(newName);

    const value = await nextValue(state.user$);
    expect(value).toEqual(jasmine.objectContaining(newName));
  });

  it('reads embedded from the global object', async () => {
    mockGlobals.get.and.returnValue(true);
    state.ngxsOnInit(); // Retrigger initialization

    const value = await nextValue(state.embedded$);
    expect(value).toEqual(true);
  });
});
