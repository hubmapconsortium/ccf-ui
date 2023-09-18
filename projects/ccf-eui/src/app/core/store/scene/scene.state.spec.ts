import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ALL_POSSIBLE_ORGANS, CCFDatabaseDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';
import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { ListResultsState } from '../list-results/list-results.state';
import { SceneState } from './scene.state';
import { of } from 'rxjs/internal/observable/of';



describe('SceneState', () => {
  let sceneState: SceneState;
  const globalConfigState = jasmine.createSpyObj<GlobalConfigState<unknown>>('GlobalConfigState',['getOption']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([SceneState, ListResultsState, ColorAssignmentState, DataState, GlobalConfigState])
      ],
      providers: [
        { provide: DataSourceService, useExisting: CCFDatabaseDataSourceService }
      ]
    });
    globalConfigState.getOption.and.returnValue(of(['Heart']));
    sceneState = TestBed.inject(SceneState);
  });

  it('should patch state on setSelectedReferenceOrgans', () => {
    const selected = [{ organ: 'Heart', name: 'Heart', src: '' }];
    sceneState.setSelectedReferenceOrgans(selected);
    expect(sceneState.getState().selectedReferenceOrgans).toEqual(selected);
  });

  it('should patch state on setReferenceOrgans', () => {
    const selected = [{ organ: 'Heart', name: 'Heart', src: '' }];
    sceneState.setReferenceOrgans(selected);
    expect(sceneState.getState().referenceOrgans).toEqual(selected);
  });
  it('should patch state on setSelectedReferenceOrgans', () => {
    sceneState.setReferenceOrganEntities([]);
    expect(sceneState.getState().referenceOrganEntities).toEqual([]);
  });

  it('should patch scene on setScene', () => {
    sceneState.setScene([]);
    expect(sceneState.getState().scene).toEqual([]);
  });

  it('should call listResults highlightNode on calling sceneNodeHovered', () => {
    spyOn(sceneState['listResults'], 'highlightNode').and.callThrough();
    sceneState.sceneNodeHovered({} as never);
    expect(sceneState['listResults'].highlightNode).toHaveBeenCalled();
  });
  it('should call listResults unhighlightNode on calling sceneNodeUnhover', () => {
    spyOn(sceneState['listResults'], 'unHighlightNode').and.callThrough();
    sceneState.sceneNodeUnhover();
    expect(sceneState['listResults'].unHighlightNode).toHaveBeenCalled();
  });

  it('should call setSelectedReferenceOrgans on calling setSelectedReferenceOrgansWithDefaults', () => {
    spyOn(sceneState,'setSelectedReferenceOrgans').and.callThrough();
    sceneState.setSelectedReferenceOrgansWithDefaults(ALL_POSSIBLE_ORGANS, ['Heart']);
    expect(sceneState.setSelectedReferenceOrgans).toHaveBeenCalled();
  });
});
