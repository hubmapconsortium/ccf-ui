import { Matrix4, toRadians } from '@math.gl/core';

import { CCFDatabase } from './ccf-database';
import { Filter } from './interfaces';
import { getSpatialEntity } from './queries/spatial-result-n3';
import { SpatialEntity } from './spatial-types';
import { ccf, rui } from './util/prefixes';


export interface SpatialSceneNode {
  '@id': string;
  '@type': 'SpatialSceneNode';
  unpickable?: boolean;
  wireframe?: boolean;
  _lighting?: string;
  scenegraph?: string;
  scenegraphNode?: string;
  zoomBasedOpacity?: boolean;
  zoomToOnLoad?: boolean;
  color?: [number, number, number, number];
  transformMatrix: Matrix4;
  tooltip: string;
}

export class CCFSpatialScene {

  constructor(private db: CCFDatabase) {}

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
    return getSpatialEntity(this.db.store, bodyId);
  }

  getReferenceOrgans(filter?: Filter): SpatialEntity[] {
    let organsId: string;
    switch (filter?.sex) {
      case 'Male':
        organsId = ccf.spatial.MaleOrgans.id;
        break;
      case 'Female':
        organsId = ccf.spatial.FemaleOrgans.id;
        break;
      case 'Both':
      default:
        organsId = ccf.spatial.FemaleOrgans.id;
        break;
    }
    return [getSpatialEntity(this.db.store, organsId)];
  }

  getReferenceSceneNodes(filter?: Filter): SpatialSceneNode[] {
    const wholeBody = getSpatialEntity(this.db.store, ccf.spatial.Body.id);
    const body = this.getReferenceBody(filter);
    const organs = getSpatialEntity(this.db.store, ccf.spatial.MaleOrgans.id);
    const store = this.db.store;
    const terms = filter?.ontologyTerms || [];
    const hasTerm = {
      kidney: terms.indexOf(rui.kidney.id) === 0,
      right_kidney: terms.indexOf(rui.right_kidney.id) === 0,
      left_kidney: terms.indexOf(rui.left_kidney.id) === 0,
      spleen: terms.indexOf(rui.spleen.id) === 0,
    };

    let nodes: (SpatialSceneNode | undefined)[] = [
      this.getSceneNode(body, wholeBody, {unpickable: true, color: [255, 255, 255, 1*255]}),
      ...this.getReferenceOrgans(filter).map((organ) =>
        this.getSceneNode(organ, body, {unpickable: true, _lighting: 'pbr', zoomBasedOpacity: true,  color: [255, 0, 0, 1*255]})
      ),
      this.getSceneNode(getSpatialEntity(store, ccf.x('VHRightKidney').id), body, {color: [255, 255, 255, 25], tooltip: 'Query by Right Kidney',
        unpickable: hasTerm.kidney || hasTerm.right_kidney, zoomToOnLoad: hasTerm.right_kidney}),
      this.getSceneNode(getSpatialEntity(store, ccf.x('VHLeftKidney').id), body, {color: [255, 255, 255, 25], tooltip: 'Query by Left Kidney',
        unpickable: hasTerm.kidney || hasTerm.left_kidney, zoomToOnLoad: hasTerm.left_kidney}),
      this.getSceneNode(getSpatialEntity(store, ccf.x('VHSpleen').id), body, {color: [255, 255, 255, 25], tooltip: 'Query by Spleen!',
        unpickable: hasTerm.spleen, zoomToOnLoad: hasTerm.spleen})
    ];

    if (filter?.debug) {
      // Debug bounding boxes
      nodes = nodes.concat([
        this.getSceneNode(getSpatialEntity(store, ccf.x('VHRightKidney').id), wholeBody, {color: [0, 0, 255, 0.5*255], wireframe: true}),
        this.getSceneNode(getSpatialEntity(store, ccf.x('VHLeftKidney').id), wholeBody, {color: [255, 0, 0, 0.5*255], wireframe: true}),
        this.getSceneNode(getSpatialEntity(store, ccf.x('VHSpleenCC1').id), wholeBody, {color: [0, 255, 0, 0.5*255], wireframe: true}),
        this.getSceneNode(getSpatialEntity(store, ccf.x('VHSpleenCC2').id), wholeBody, {color: [0, 255, 0, 0.5*255], wireframe: true}),
        this.getSceneNode(getSpatialEntity(store, ccf.x('VHSpleenCC3').id), wholeBody, {color: [0, 255, 0, 0.5*255], wireframe: true})
      ]);
    }

    return nodes.filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getSceneNode(source: SpatialEntity, target: SpatialEntity, nodeAttrs: Partial<SpatialSceneNode> = {}): SpatialSceneNode | undefined {
    const has3dObject = source.object && source.object.file_format?.startsWith('model/gltf');
    const sourceID = has3dObject && source.object ? source.object['@id'] : source['@id'];
    let transform = this.db.graph.getTransformationMatrix(sourceID, target['@id']);
    if (transform) {
      if (has3dObject) {
        transform = new Matrix4().rotateX(toRadians(90)).multiplyLeft(transform);
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
    const body = this.getReferenceBody(filter);
    return [
      ...this.getReferenceSceneNodes(filter),
      ...this.db.getSpatialEntities(filter).map((entity) =>
        this.getSceneNode(entity, body, {color: [255, 255, 255, 0.9*255]})
      )
    ].filter(s => s !== undefined) as SpatialSceneNode[];
  }
}
