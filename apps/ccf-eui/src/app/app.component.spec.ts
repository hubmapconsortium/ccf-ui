import { Immutable } from '@angular-ru/common/typings';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { Observable, of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { Filter, OntologyTreeModel } from 'ccf-database';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { OntologySelection } from './core/models/ontology-selection';
import { ThemingService } from './core/services/theming/theming.service';
import { DataState } from './core/store/data/data.state';
import { ListResultsState } from './core/store/list-results/list-results.state';
import { SceneState } from './core/store/scene/scene.state';
import { StoreModule } from './core/store/store.module';
import { FiltersPopoverComponent } from './modules/filters/filters-popover/filters-popover.component';
import { DrawerComponent } from './shared/components/drawer/drawer/drawer.component';

@NgModule()
class EmptyModule {}

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  let left: jasmine.SpyObj<DrawerComponent>;
  let right: jasmine.SpyObj<DrawerComponent>;
  let filterbox: jasmine.SpyObj<FiltersPopoverComponent>;
  const testFilter: Filter = {
    sex: 'Both',
    ageRange: [5, 99],
    bmiRange: [30, 80],
    ontologyTerms: [],
    cellTypeTerms: [],
    biomarkerTerms: [],
    consortiums: [],
    tmc: [],
    spatialSearches: [],
    technologies: []
  };
  const testTreeStr: OntologyTreeModel = {
    root: 'a',
    nodes: {
      a: {
        ['@id']: 'a',
        ['@type']: 'OntologyTreeNode',
        children: [],
        id: 'a',
        label: 'a',
        parent: 'a',
        synonymLabels: [],
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DataState], {})],
    });

    const mockConsentService = jasmine.createSpyObj<ConsentService>([
      'setConsent',
    ]);
    left = jasmine.createSpyObj<DrawerComponent>('Drawer', [
      'open',
      'closeExpanded',
    ]);
    right = jasmine.createSpyObj<DrawerComponent>('Drawer', [
      'open',
      'closeExpanded',
    ]);
    filterbox = jasmine.createSpyObj<FiltersPopoverComponent>(
      'FiltersPopover',
      ['removeBox']
    );
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .replaceModule(StoreModule, EmptyModule)
      .mock(ListResultsState, {
        listResults$: of([]),
      })
      .mock(SceneState, {
        referenceOrgans$: of([]),
        selectedReferenceOrgans$: of([]),
        setSelectedReferenceOrgansWithDefaults: ()=>null,
        scene$: of([])
      })
      .mock(DataState, {
        state$: of({ status: 'Ready' }),
        databaseReady$: of('Ready'),
        filter$: of(testFilter),
        tissueBlockData$: of(),
        aggregateData$: of(),
        queryStatus$: of(),
        ontologyTermOccurencesData$: of(),
        cellTypeTermOccurencesData$: of(),
        biomarkerTermOccurencesData$: of(),
        biomarkerTermsFullData$: of(),
        sceneData$: of(),
        technologyFilterData$: of(),
        providerFilterData$: of(),
        updateFilter: () => undefined
      })
      .mock(ConsentService, {
        ...mockConsentService,
        consent: 'not-set',
      })
      .mock(MatSnackBar, {
        openFromComponent: (): MatSnackBarRef<unknown> =>
          ({} as unknown as MatSnackBarRef<unknown>),
      })
      .mock(ThemingService, {
        initialize: () => undefined,
        getTheme: () => 'theme',
        setTheme: () => undefined,
      })
      // .mock(DataStateSelectors, {
      //   anatomicalStructuresTreeModel: () => testTreeStr,
      //   cellTypesTreeModel: () => testTreeStr,
      // })
      .mock(GlobalConfigState, {
        snapshot: {},
        config$: new Observable<Immutable<unknown>>(),
        patchConfig: () => undefined,
        getOption: () => of(undefined),
        patchState: () => undefined
      });
  });

  it('should make the tracking popup on init', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });

  it('should close the left drawer when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(left.open).toHaveBeenCalled();
    expect(left.closeExpanded).toHaveBeenCalled();
  });

  it('should close the right drawer when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(right.open).toHaveBeenCalled();
    expect(right.closeExpanded).toHaveBeenCalled();
  });

  it('should close the filters box when reset() is called', async () => {
    const { instance } = await shallow.render();
    instance.reset(left, right, filterbox);

    expect(filterbox.removeBox).toHaveBeenCalled();
  });

  it('should call reset when refresh button is clicked', async () => {
    const { find, instance } = await shallow.render();
    const spy = spyOn(instance, 'reset');
    const resetButton = find('.refresh');
    resetButton.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should display the current sex', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .sex').nativeElement as HTMLElement;
    expect(label.textContent).toBe('Sex: Both');
  });

  it('should display the current age range', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .age').nativeElement as HTMLElement;
    expect(label.textContent).toBe('Age: 5-99');
  });

  it('should display the current BMI range', async () => {
    const { find } = await shallow.render();
    const label = find('.filter-text .bmi').nativeElement as HTMLElement;
    expect(label.textContent).toBe('BMI: 30-80');
  });

  it('should set this.url to the passed in url when openiFrameViewer is called', async () => {
    const { instance } = await shallow.render();
    instance.acceptableViewerDomains = ['test.com'];
    instance.url = '';
    instance.openiFrameViewer('test.com');
    expect(instance.url).toEqual('test.com');
  });

  it('should set this.viewerOpen to true whenever openiFrameViewer is called', async () => {
    const { instance } = await shallow.render();
    instance.acceptableViewerDomains = ['test.com'];
    instance.viewerOpen = false;
    instance.openiFrameViewer('test.com');
    expect(instance.viewerOpen).toBeTrue();
  });

  it('should set this.viewerOpen to false whenever closeiFrameViewer is called', async () => {
    const { instance } = await shallow.render();
    instance.viewerOpen = true;
    instance.closeiFrameViewer();
    expect(instance.viewerOpen).not.toBeTrue();
  });

  it('resets the view', async () => {
    const { instance } = await shallow.render();
    instance.resetView();
    expect(instance.bodyUI.target).toEqual([0, 0, 0]);
    expect(instance.bodyUI.rotation).toEqual(0);
    expect(instance.bodyUI.rotationX).toEqual(0);
    expect(instance.bodyUI.bounds).toEqual({ x: 2.2, y: 2, z: 0.4 });
  });

  it('resets the view if body is selected in the ontology', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockOntologySelection = [{ label: 'body' } as OntologySelection];
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'resetView');
    instance.ontologySelected(undefined, 'anatomical-structures');
    expect(spy).toHaveBeenCalledTimes(0);
    instance.ontologySelected(mockOntologySelection, 'anatomical-structures');
    expect(spy).toHaveBeenCalled();
  });

  it('it injects DataState', async () => {
    const { instance, inject } = await shallow.render();
    inject(Store).reset({
      data: {
        anatomicalStructuresTreeModel: testTreeStr,
        cellTypesTreeModel: testTreeStr
      }
    });

    expect(instance.selectedtoggleOptions).toBeDefined();
  });

  it(': toggleSelection works', async () => {
    const { instance, inject } = await shallow.render();
    inject(Store).reset({
      data: {
        anatomicalStructuresTreeModel: testTreeStr,
        cellTypesTreeModel: testTreeStr
      }
    });
    instance.selectedtoggleOptions=['body','cell'];
    instance.toggleSelection('body');

    expect(instance.selectedtoggleOptions).toBeDefined();
    instance.toggleSelection('a');

    expect(instance.selectedtoggleOptions).toBeDefined();
  });
});
