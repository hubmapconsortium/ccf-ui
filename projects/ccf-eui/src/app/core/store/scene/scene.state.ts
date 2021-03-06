import { Injectable, Injector } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode, NodeClickEvent } from 'ccf-body-ui';
import { ALL_POSSIBLE_ORGANS, OrganInfo } from 'ccf-shared';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, pluck, take, tap } from 'rxjs/operators';

import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { DataSourceService } from '../../services/data-source/data-source.service';

export const DEFAULT_SELECTED_ORGANS = new Set(['Skin', 'Heart', 'Kidney', 'Spleen']);

export interface SceneStateModel {
  scene: SpatialSceneNode[];
  referenceOrgans: OrganInfo[];
  selectedReferenceOrgans: OrganInfo[];

  selectedAnatomicalStructures: unknown[];
  anatomicalStructureSettings: {
    [iri: string]: {
      enabled: boolean;
      visible: boolean;
      opacity: boolean;
    };
  };
}

/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {
    scene: [],
    referenceOrgans: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
    anatomicalStructureSettings: {}
  }
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  /** Available Reference Organs */
  readonly referenceOrgans$ = this.state$.pipe(pluck('referenceOrgans'), distinctUntilChanged());
  /** Selected Reference Organs */
  readonly selectedReferenceOrgans$ = this.state$.pipe(pluck('selectedReferenceOrgans'), distinctUntilChanged());
  /** Scene to display in the 3d Scene */
  readonly scene$ = this.state$.pipe(pluck('scene'), distinctUntilChanged());

  /** The data state */
  private dataState: DataState;

  /** Color assignments state */
  private colorAssignments: ColorAssignmentState;

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load data state
   */
  constructor(
    private readonly dataService: DataSourceService,
    private readonly injector: Injector
  ) {
    super();
  }

  /**
   * Sets the selected reference organs
   *
   * @param referenceOrgans The selected reference organs selected
   */
  @DataAction()
  setSelectedReferenceOrgans(@Payload('selectedReferenceOrgans') selectedReferenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ selectedReferenceOrgans });
  }

  /**
   * Sets the reference organs
   *
   * @param referenceOrgans The reference organs available
   */
  @DataAction()
  setReferenceOrgans(@Payload('referenceOrgans') referenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ referenceOrgans });
  }

  /**
   * Sets the scene
   *
   * @param scene The active scene to display
   */
  @DataAction()
  setScene(@Payload('scene') scene: SpatialSceneNode[]): void {
    this.ctx.patchState({ scene });
  }

  /**
   * Handle scene node clicks
   *
   * @param param0 scene node click event
   */
  sceneNodeClicked({node, ctrlClick}: NodeClickEvent) {
    if (node.representation_of &&
      node['@id'] !== 'http://purl.org/ccf/latest/ccf.owl#VHFSkin'
      && node.entityId // Disables this path. Need to update logic here.
    ) {
      this.dataState.updateFilter({ ontologyTerms: [node.representation_of] });
    } else if (node.entityId) {
      this.colorAssignments.assignColor(node['@id'], !ctrlClick);
    }
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.dataState = this.injector.get(DataState);
    this.colorAssignments = this.injector.get(ColorAssignmentState);

    // Initialize reference organ info
    this.dataService.getReferenceOrgans().pipe(
      map(refOrgans => {
        const organIds = new Set(refOrgans.map(o => o.representation_of));
        return ALL_POSSIBLE_ORGANS
          .filter(organ => organIds.has(organ.id))
          .map(organ => ({ ...organ, disabled: false, numResults: 0 }));
      }),
      take(1),
      tap(organs => {
        this.setReferenceOrgans(organs);
        this.setSelectedReferenceOrgans(organs.filter(organ => DEFAULT_SELECTED_ORGANS.has(organ.organ)));
      })
    ).subscribe();

    // Update scene as the overall state changes
    combineLatest([
      this.dataState.sceneData$,
      this.selectedReferenceOrgans$,
      this.colorAssignments.colorAssignments$,
      this.dataService.getReferenceOrgans()
    ]).pipe(
      map(([scene, selectedOrgans, colors, refOrganData]) => {
        const activeOrgans = new Set(selectedOrgans.map(o => o.id));
        const refOrgans = new Set(refOrganData.filter(o => activeOrgans.has(o.representation_of)).map(o => o['@id']));
        return scene.filter(node =>
          (node.ccf_annotations && node.ccf_annotations.some(tag => activeOrgans.has(tag)))
          ||
          (node.reference_organ && refOrgans.has(node.reference_organ))
        ).map(node => node.entityId && colors.hasOwnProperty(node['@id']) ?
          ({ ...node, color: colors[node['@id']].rgba } as SpatialSceneNode) : node
        );
      }),
      tap(scene => this.setScene(scene))
    ).subscribe();
  }
}
