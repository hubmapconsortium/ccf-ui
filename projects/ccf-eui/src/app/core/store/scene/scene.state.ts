import { Injectable, Injector } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { ALL_POSSIBLE_ORGANS, OrganInfo } from 'ccf-shared';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';

import { DataState } from '../data/data.state';
import { DataSourceService } from './../../services/data-source/data-source.service';


export interface SceneStateModel {
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
    referenceOrgans: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
    anatomicalStructureSettings: {}
  }
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  /** Available Reference Organs */
  readonly referenceOrgans$ = this.state$.pipe(pluck('referenceOrgans'));
  /** Selected Reference Organs */
  readonly selectedReferenceOrgans$ = this.state$.pipe(pluck('selectedReferenceOrgans'));

  /** Scene to display in the 3d Scene */
  @Computed()
  get scene$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.dataState.sceneData$, this.selectedReferenceOrgans$, this.dataService.getReferenceOrgans()]).pipe(
      map(([scene, selectedOrgans, refOrganData]) => {
        const activeOrgans = new Set(selectedOrgans.map(o => o.id));
        const refOrgans = new Set(refOrganData.filter(o => activeOrgans.has(o.representation_of)).map(o => o['@id']));
        return scene.filter(node =>
          (node.ccf_annotations && node.ccf_annotations.some(tag => activeOrgans.has(tag)))
          ||
          (node.reference_organ && refOrgans.has(node.reference_organ))
        );
      })
    );
  }

  /** The data state */
  private dataState: DataState;

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
  setSelectedReferenceOrgans(selectedReferenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ selectedReferenceOrgans });
  }

  /**
   * Sets the reference organs
   *
   * @param referenceOrgans The reference organs available
   */
  @DataAction()
  setReferenceOrgans(referenceOrgans: OrganInfo[]): void {
    this.ctx.patchState({ referenceOrgans });
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.dataState = this.injector.get(DataState);

    this.dataService.getReferenceOrgans().pipe(
      map(refOrgans => {
        const organLookup = ALL_POSSIBLE_ORGANS.reduce((acc, organ) => {
          acc[organ.id as string] = organ;
          return acc;
        }, {} as Record<string, OrganInfo>);

        const organIds: string[] = [];
        for (const organ of refOrgans) {
          const id = organ.representation_of;
          if (id && organLookup[id] && !organIds.includes(id)) {
            organIds.push(id);
          }
        }

        return organIds.map(id => ({
          ...organLookup[id], disabled: false, numResults: 0
        } as OrganInfo));
      }),
      take(1)
    ).subscribe(organs => {
      this.setReferenceOrgans(organs);
      this.setSelectedReferenceOrgans(organs.filter(organ => organ.name !== 'Large Intestine'));
    });
  }
}
