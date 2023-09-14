/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Injector, inject } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { NgxsOnInit, Selector, State } from '@ngxs/store';
import { NodeClickEvent, SpatialSceneNode } from 'ccf-body-ui';
import { SpatialEntity } from 'ccf-database';
import { ALL_POSSIBLE_ORGANS, DataSourceService, GlobalConfigState, OrganInfo } from 'ccf-shared';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, take, tap, withLatestFrom } from 'rxjs/operators';

import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { ListResultsState } from '../list-results/list-results.state';

export const DEFAULT_SELECTED_ORGANS = new Set(['Skin', 'Heart', 'Kidney', 'Spleen']);

export interface SceneStateModel {
  scene: SpatialSceneNode[];
  referenceOrgans: OrganInfo[];
  referenceOrganEntities: SpatialEntity[];
  selectedReferenceOrgans: OrganInfo[];

  selectedAnatomicalStructures: unknown[];
  anatomicalStructureSettings: {
    [iri: string]: {
      enabled: boolean;
      visible: boolean;
      opacity: boolean;
    };
  };
  highlightedId?: string;
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
    referenceOrganEntities: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
    anatomicalStructureSettings: {}
  }
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  @Selector()
  static referenceOrgans(state: SceneStateModel): OrganInfo[] {
    return state.referenceOrgans;
  }

  @Selector()
  static referenceOrganEntities(state: SceneStateModel): SpatialEntity[] {
    return state.referenceOrganEntities;
  }

  /** Available Reference Organs */
  readonly referenceOrgans$ = this.state$.pipe(map(x => x?.referenceOrgans), distinctUntilChanged());
  /** Selected Reference Organs */
  readonly selectedReferenceOrgans$ = this.state$.pipe(map(x => x?.selectedReferenceOrgans), distinctUntilChanged());
  /** Scene to display in the 3d Scene */
  readonly scene$ = this.state$.pipe(map(x => x?.scene), distinctUntilChanged());

  readonly highlightedId$ = this.state$.pipe(map(x => x?.highlightedId), distinctUntilChanged());

  defaultSelectedOrgans: Set<string>;
  /** The data state */
  private dataState: DataState;

  /** Color assignments state */
  private colorAssignments: ColorAssignmentState;

  private listResults: ListResultsState;

  private globalConfig = inject(GlobalConfigState<unknown>);


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
   * Sets the reference organ entities
   *
   * @param referenceOrganEntities The reference organ entities available
   */
  @DataAction()
  setReferenceOrganEntities(@Payload('referenceOrganEntities') referenceOrganEntities: SpatialEntity[]): void {
    this.ctx.patchState({ referenceOrganEntities });
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
  sceneNodeClicked({ node, ctrlClick }: NodeClickEvent): void {
    if (node.representation_of &&
      node['@id'] !== 'http://purl.org/ccf/latest/ccf.owl#VHFSkin'
      && node.entityId // Disables this path. Need to update logic here.
    ) {
      this.dataState.updateFilter({ ontologyTerms: [node.representation_of] });
    } else if (node.entityId) {
      this.colorAssignments.assignColor(node['@id'], !ctrlClick);
    }
  }

  sceneNodeHovered(node: SpatialSceneNode): void {
    this.listResults.highlightNode(node['@id']);
  }

  sceneNodeUnhover(): void {
    this.listResults.unHighlightNode();
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
    this.listResults = this.injector.get(ListResultsState);

    // Initialize reference organ info
    this.dataService.getReferenceOrgans().pipe(
      tap(refOrgans => this.setReferenceOrganEntities(refOrgans)),
      map(refOrgans => {
        const organIds = new Set(refOrgans.map(o => o.representation_of));
        return ALL_POSSIBLE_ORGANS
          .filter(organ => organIds.has(organ.id))
          .map(organ => ({ ...organ, disabled: false, numResults: 0 }));
      }),
      take(1),
      tap((organs: OrganInfo[]) => this.setReferenceOrgans(organs)), withLatestFrom(this.globalConfig.getOption('selectedOrgans').pipe(map((ar: string[]) => ar?.length ? ar : undefined)))
    ).pipe(tap(([organs, defaultSelectedOrgans = DEFAULT_SELECTED_ORGANS]) => this.setSelectedReferenceOrgans(organs.filter(organ => new Set(defaultSelectedOrgans).has(organ.organ)))))
      .subscribe();

    // Update scene as the overall state changes
    combineLatest([
      this.dataState.sceneData$,
      this.selectedReferenceOrgans$,
      this.colorAssignments.colorAssignments$,
      this.dataService.getReferenceOrgans(),
      this.listResults.highlightedNodeId$
    ]).pipe(
      map(([scene, selectedOrgans, colors, refOrganData, highlightedNodeId]) => {
        const activeOrgans = new Set(selectedOrgans.map(o => o.id));
        const refOrgans = new Set(refOrganData.filter(o => activeOrgans.has(o.representation_of)).map(o => o['@id']));
        return scene.filter(node =>
          (node.ccf_annotations?.some?.(tag => activeOrgans.has(tag))) ??
          (node.reference_organ && refOrgans.has(node.reference_organ))
        ).map((node): SpatialSceneNode =>
          node.entityId && (Object.prototype.hasOwnProperty.call(colors, node['@id']) || highlightedNodeId === node['@id']) ?
            ({
              ...node,
              color: highlightedNodeId === node['@id'] ?
                [30, 136, 229, 255] :
                colors[node['@id']].rgba as [number, number, number, number]
            }) : node
        );
      }),
      tap(scene => this.setScene(scene))
    ).subscribe();
  }
}
