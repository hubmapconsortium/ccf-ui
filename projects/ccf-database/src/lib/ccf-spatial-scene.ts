/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4, toRadians } from '@math.gl/core';

import { CCFDatabase } from './ccf-database';
import { Filter } from './interfaces';
import {
  getAnatomicalStructures, getExtractionSet, getExtractionSets, getReferenceOrgans, getSpatialEntity,
} from './queries/spatial-result-n3';
import { ExtractionSet, SpatialEntity } from './spatial-types';
import { ccf } from './util/prefixes';


export interface SpatialSceneNode {
  '@id': string;
  '@type': string;
  entityId?: string;
  ccf_annotations?: string[];
  representation_of?: string;
  reference_organ?: string;
  unpickable?: boolean;
  wireframe?: boolean;
  _lighting?: string;
  scenegraph?: string;
  scenegraphNode?: string;
  zoomBasedOpacity?: boolean;
  zoomToOnLoad?: boolean;
  color?: [number, number, number, number];
  opacity?: number;
  transformMatrix: Matrix4;
  name?: string;
  tooltip?: string;
  priority?: number;
}

export class CCFSpatialScene {

  constructor(private db: CCFDatabase) {}

  getSpatialEntity(iri: string): SpatialEntity {
    return getSpatialEntity(this.db.store, iri);
  }
  getExtractionSets(iri: string): ExtractionSet[] {
    return getExtractionSets(this.db.store, iri);
  }
  getExtractionSet(iri: string): ExtractionSet {
    return getExtractionSet(this.db.store, iri);
  }
  getAnatomicalStructures(iri: string): SpatialEntity[] {
    return getAnatomicalStructures(this.db.store, iri);
  }
  getReferenceOrgans(): SpatialEntity[] {
    return getReferenceOrgans(this.db.store);
  }

  getReferenceBody(filter?: Filter): SpatialEntity {
    let bodyId: string;
    switch (filter?.sex) {
      case 'Male':
        bodyId = ccf.spatial.Male.id;
        break;
      case 'Female':
        bodyId = ccf.spatial.Female.id;
        break;
      case 'Both':
      default:
        bodyId = ccf.spatial.BothSexes.id;
        break;
    }
    return this.getSpatialEntity(bodyId);
  }

  getReferenceOrganSets(filter?: Filter): SpatialEntity[] {
    let organSet = this.getReferenceOrgans();
    switch (filter?.sex) {
      case 'Male':
        organSet = organSet.filter(s => s.sex === 'Male');
        break;
      case 'Female':
        organSet = organSet.filter(s => s.sex === 'Female');
        break;
      case 'Both':
      default:
        break;
    }
    organSet = organSet.map(o => [ [o], this.getAnatomicalStructures(o['@id'])])
      .reduce((acc, [organ, structures]) => acc.concat(structures.length > 0 ? structures : organ), [] as SpatialEntity[]);
    return organSet;
  }

  getReferenceSceneNodes(filter?: Filter): SpatialSceneNode[] {
    const body = this.getReferenceBody(filter);

    const terms = new Set<string>(filter?.ontologyTerms ?? []);
    let nodes: (SpatialSceneNode | undefined)[] = [
      ...this.getReferenceOrganSets(filter).map((organ) => {
        const isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
        return this.getSceneNode(organ, body, {
          unpickable: true,
          _lighting: 'pbr',
          color: [255, 255, 255, 255],
          opacity: isSkin ? 0.5 : 0.2,
          zoomBasedOpacity: false
        });
      })
    ];

    if (filter?.debug) {
      // Debug bounding boxes
      nodes = nodes.concat([
        this.getSceneNode(this.getSpatialEntity(ccf.x('VHRightKidney').id), body, { color: [0, 0, 255, 0.5*255], wireframe: true }),
        this.getSceneNode(this.getSpatialEntity(ccf.x('VHLeftKidney').id), body, { color: [255, 0, 0, 0.5*255], wireframe: true }),
        this.getSceneNode(this.getSpatialEntity(ccf.x('VHSpleenCC1').id), body, { color: [0, 255, 0, 0.5*255], wireframe: true }),
        this.getSceneNode(this.getSpatialEntity(ccf.x('VHSpleenCC2').id), body, { color: [0, 255, 0, 0.5*255], wireframe: true }),
        this.getSceneNode(this.getSpatialEntity(ccf.x('VHSpleenCC3').id), body, { color: [0, 255, 0, 0.5*255], wireframe: true })
      ]);
    }

    return nodes.filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getEntitySceneNodes(filter?: Filter): SpatialSceneNode[] {
    const body = this.getReferenceBody(filter);
    return this.db.getSpatialEntities(filter).map((entity) =>
      this.getSceneNode(entity, body, { color: [255, 255, 255, 0.9*255] })
    ).filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getSceneNode(source: SpatialEntity, target: SpatialEntity, nodeAttrs: Partial<SpatialSceneNode> = {}): SpatialSceneNode | undefined {
    const has3dObject = source.object && source.object.file_format?.startsWith('model/gltf');
    const sourceID = has3dObject && source.object ? source.object['@id'] : source['@id'];
    let transform = this.db.graph.getTransformationMatrix(sourceID, target['@id']);
    if (transform) {
      if (has3dObject) {
        transform = new Matrix4(Matrix4.IDENTITY).rotateX(toRadians(90)).multiplyLeft(transform);
      } else {
        // Scale visible bounding boxes to the desired dimensions
        let factor: number;
        switch (source.dimension_units) {
          case 'centimeter':
            factor = 1 / 100;
            break;
          case 'millimeter':
            factor = 1 / 1000;
            break;
          case 'meter':
          default:
            factor = 1;
            break;
        }
        const scale = [source.x_dimension, source.y_dimension, source.z_dimension].map(dim => dim * factor / 2);
        transform.scale(scale);
      }
      return {
        '@id': source['@id'], '@type': 'SpatialSceneNode',
        entityId: source.entityId || undefined,
        ccf_annotations: source.ccf_annotations || undefined,
        representation_of: source.representation_of || undefined,
        reference_organ: source.reference_organ || undefined,
        scenegraph: has3dObject ? source.object?.file : undefined,
        scenegraphNode: has3dObject ? source.object?.file_subpath : undefined,
        transformMatrix: transform,
        tooltip: source.label,
        ...nodeAttrs
      } as SpatialSceneNode;
    } else {
      return undefined;
    }
  }

  getScene(filter?: Filter): SpatialSceneNode[] {
    return [
      ...this.getReferenceSceneNodes(filter),
      ...this.getEntitySceneNodes(filter)
    ];
  }
}
