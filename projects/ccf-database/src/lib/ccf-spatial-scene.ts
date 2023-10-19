/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4, toRadians } from '@math.gl/core';

import { CCFDatabase } from './ccf-database';
import { Filter } from './interfaces';
import {
  getAnatomicalStructures, getExtractionSet, getExtractionSets, getReferenceOrgans, getSpatialEntity,
} from './queries/spatial-result-n3';
import { ExtractionSet, SpatialEntity } from './spatial-types';
import { ccf } from './util/prefixes';


export type SpatialSceneGeometry = 'sphere' | 'cube' | 'wireframe' | 'text' | 'cone' | 'cylinder';

export interface SpatialSceneNode {
  '@id': string;
  '@type': string;
  entityId?: string;
  ccf_annotations?: string[];
  representation_of?: string;
  reference_organ?: string;
  sex?: 'Male' | 'Female';
  unpickable?: boolean;
  geometry?: SpatialSceneGeometry;
  text?: string;
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
    if (filter?.debug) {
      organSet = organSet.map(o => [ [o], this.getAnatomicalStructures(o['@id'])])
        .reduce<SpatialEntity[]>((acc, [organ, structures]) => acc.concat(structures.length > 0 ? structures : organ), []);
    }
    return organSet;
  }

  getReferenceSceneNodes(filter?: Filter): SpatialSceneNode[] {
    const body = this.getReferenceBody(filter);
    const skinNodes: SpatialSceneNode[] = [];
    let nodes: (SpatialSceneNode | undefined)[] = [
      ...this.getReferenceOrganSets(filter).map((organ) => {
        const isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
        const sceneNode = this.getSceneNode(organ, body, {
          color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr', zoomBasedOpacity: !isSkin
        });
        if (isSkin && sceneNode) {
          skinNodes.push(sceneNode);
          return undefined;
        } else {
          return sceneNode;
        }
      })
    ];
    if (skinNodes.length > 0) {
      nodes = [...skinNodes, ...nodes];
    }

    if (filter?.debug) {
      // Debug bounding boxes
      nodes = nodes.concat([
        this.getSceneNode(this.getSpatialEntity(ccf.base('VHRightKidney').id), body, { color: [0, 0, 255, 0.5*255], geometry: 'wireframe' }),
        this.getSceneNode(this.getSpatialEntity(ccf.base('VHLeftKidney').id), body, { color: [255, 0, 0, 0.5*255], geometry: 'wireframe' }),
        this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC1').id), body, { color: [0, 255, 0, 0.5*255], geometry: 'wireframe' }),
        this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC2').id), body, { color: [0, 255, 0, 0.5*255], geometry: 'wireframe' }),
        this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC3').id), body, { color: [0, 255, 0, 0.5*255], geometry: 'wireframe' })
      ]);
    }

    return nodes.filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getReferenceOrganScene(organIri: string, filter?: Filter): SpatialSceneNode[] {
    const hasSexFilter = filter?.sex !== undefined && filter?.sex?.toLowerCase() !== 'both';
    const organs = this.getReferenceOrgans().filter((o) => o.representation_of === organIri && (!hasSexFilter || o.sex === filter?.sex));
    if (organs.length > 0) {
      const organ = organs[0];
      const isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
      const organNode = this.getSceneNode(organ, organ, {
        color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr'
      }) as SpatialSceneNode;

      const scene = (this.db.getSpatialEntities(filter) ?? []).map((entity) =>
        this.getSceneNode(entity, organ, { color: [255, 255, 255, 0.9*255] })
      ) as SpatialSceneNode[];
      return [organNode].concat(scene).filter(n => n !== undefined);
    } else {
      return [];
    }
  }

  getEntitySceneNodes(filter?: Filter): SpatialSceneNode[] {
    const body = this.getReferenceBody(filter);
    return this.db.getSpatialEntities(filter).map((entity) =>
      this.getSceneNode(entity, body, { color: [255, 255, 255, 0.9*255] })
    ).filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getSceneNode(source: SpatialEntity, target: SpatialEntity, nodeAttrs: Partial<SpatialSceneNode> = {}): SpatialSceneNode | undefined {
    const has3dObject = source?.object?.file_format?.startsWith('model/gltf');
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
        entityId: source.entityId,
        ccf_annotations: source.ccf_annotations,
        representation_of: source.representation_of,
        reference_organ: source.reference_organ,
        sex: source.sex,
        scenegraph: has3dObject ? source.object?.file : undefined,
        scenegraphNode: has3dObject ? source.object?.file_subpath : undefined,
        transformMatrix: transform,
        tooltip: source.label,
        ...nodeAttrs
      };
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
