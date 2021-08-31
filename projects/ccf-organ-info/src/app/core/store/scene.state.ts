import { Injectable, Injector } from '@angular/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { AABB, Vec3 } from 'cannon-es';
import { SpatialEntityJsonLd, SpatialSceneNode } from 'ccf-body-ui';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ModelState } from './model.state';
import { ReferenceDataState } from './reference-data/reference-data.state';

/**
 * Interface for visibility item data
 */
 export interface VisibilityItem {
  /**
   * Id of the item
   */
  id: string | number;

  /**
   * Name of the item
   */
  name: string;

  /**
   * Whether the item is currently highlighted
   */
  visible: boolean;

  /**
   * Opacity value
   */
  opacity?: number;

  /**
   * Tooltip text to be displayed in the stage
   */
  tooltip?: string;
}


/**
 * Contains information for an extraction set
 */
export interface ExtractionSet {
  /** Name of the set */
  name: string;

  /** Organ that the extraction sites belong to */
  organ?: string;

  /** Extraction sites belonging to the organ in the extraction set */
  sites: VisibilityItem[];
}



/**
 * Scene state model
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SceneStateModel {
  showCollisions: boolean;
}

function getNodeBbox(model: SpatialSceneNode): AABB {
  const mat = new Matrix4(model.transformMatrix);
  const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
  const upperBound = mat.transformAsPoint([1, 1, 1], []);
  return new AABB({
    lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
    upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
  });
}

/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {showCollisions: !environment.production}
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {

  @Computed()
  get nodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([
      this.referenceOrganNodes$
    ]).pipe(
      map(([nodes]) => [
        ...nodes
      ])
    );
  }

  @Computed()
  get rotatedNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.rotation$, this.nodes$]).pipe(
      map(([rotation, nodes]) => {
        if (rotation === 0) {
          return nodes;
        } else {
          return nodes.map(n => ({
            ...n,
            transformMatrix: new Matrix4(Matrix4.IDENTITY).rotateY(toRadians(rotation)).multiplyRight(n.transformMatrix)
          }));
        }
      })
    );
  }

  /** Observable of spatial nodes */
  @Computed()
  get referenceOrganNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.extractionSites$, this.model.organIri$]).pipe(
      debounceTime(400),
      map(([anatomicalStructures, extractionSites, organIri]) =>
        this.createSceneNodes(organIri as string, [...anatomicalStructures, ...extractionSites] as VisibilityItem[])
      )
    );
  }

  @Computed()
  get rotation$(): Observable<number> {
    return this.model.viewSide$.pipe(
      map((side) => {
        let rotation = 0;
        switch(side) {
          case 'left':
            rotation = -90;
            break;
          case 'right':
            rotation = 90;
            break;
          case 'posterior':
            rotation = 180;
            break;
        }
        return rotation;
      })
    );
  }

  /** Reference to the model state */
  private model: ModelState;
  private referenceData: ReferenceDataState;

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load page and model state
   */
  constructor(
    private readonly injector: Injector
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.model = this.injector.get(ModelState);
    this.referenceData = this.injector.get(ReferenceDataState);
  }

  private createSceneNodes(organIri: string, items: VisibilityItem[]): SpatialSceneNode[] {
    const db = this.referenceData.snapshot;
    return items
      .filter(item => item.visible && item.opacity && item.opacity > 0)
      .map(item => {
        if (db.sceneNodeLookup[item.id]) {
          return [{
            ...db.sceneNodeLookup[item.id],
            opacity: (item.opacity || 100) / 100,
            color: [255, 255, 255, 255]
          } as SpatialSceneNode];
        } else {
          return (db.anatomicalStructures[organIri] || [])
            .filter((node) => node.representation_of === item.id)
            .map((node) => ({
              ...db.sceneNodeLookup[node['@id']],
              opacity: (item.opacity || 100) / 100,
              color: [255, 255, 255, 255]
            } as SpatialSceneNode));
        }
      })
      .reduce((acc, nodes) => acc.concat(nodes), []);
  }
}
