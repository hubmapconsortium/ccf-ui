import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NodeClickEvent } from 'ccf-body-ui';
import { ALL_POSSIBLE_ORGANS, CCFDatabaseDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';
import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { ListResultsState } from '../list-results/list-results.state';
import { DEFAULT_SELECTED_ORGANS, SceneState } from './scene.state';



describe('SceneState', () => {
  let sceneState: SceneState;
  const defaultState = {
    scene: [],
    referenceOrgans: [],
    referenceOrganEntities: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
    anatomicalStructureSettings: {}
  };
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

  it('should return referenceOrgans', () => {
    expect(SceneState.referenceOrgans(defaultState)).toEqual([]);
  });

  it('should return referenceOrgansEntities', () => {
    expect(SceneState.referenceOrganEntities(defaultState)).toEqual([]);
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

  it('should call updateFilter when sceneNode is Clicked', () => {
    const nodeClickEvent: NodeClickEvent = {
      node: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@id': '', '@type': '', representation_of: 'test', entityId: 'test',
        transformMatrix: [] as never
      }, ctrlClick: false
    };
    spyOn(sceneState['dataState'], 'updateFilter').and.callThrough();
    sceneState.sceneNodeClicked(nodeClickEvent);
    expect(sceneState['dataState'].updateFilter).toHaveBeenCalled();
  });

  it('should call assignColor when sceneNode is clicked with no representation', () => {
    const nodeClickEvent: NodeClickEvent = {
      node: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@id': '', '@type': '', representation_of: '', entityId: 'test',
        transformMatrix: [] as never
      }, ctrlClick: false
    };
    spyOn(sceneState['colorAssignments'], 'assignColor').and.callThrough();
    sceneState.sceneNodeClicked(nodeClickEvent);
    expect(sceneState['colorAssignments'].assignColor).toHaveBeenCalled();
  });

  it('should call setSelectedReferenceOrgans on calling setSelectedReferenceOrgansWithDefaults', () => {
    spyOn(sceneState, 'setSelectedReferenceOrgans').and.callThrough();
    sceneState.setSelectedReferenceOrgansWithDefaults(ALL_POSSIBLE_ORGANS, ['http://purl.obolibrary.org/obo/UBERON_0004538']);
    expect(sceneState.setSelectedReferenceOrgans).toHaveBeenCalled();
  });

  it('should set selectedReferenceOrgans with default organs if referenceOrgans Input is empty', () => {
    const defaultOrgans = ALL_POSSIBLE_ORGANS.filter(({ id }) => DEFAULT_SELECTED_ORGANS.has(id as string));
    spyOn(sceneState, 'setSelectedReferenceOrgans').and.callThrough();
    sceneState.setSelectedReferenceOrgansWithDefaults(ALL_POSSIBLE_ORGANS, []);
    expect(sceneState.getState().selectedReferenceOrgans).toEqual(defaultOrgans);
  });
});
