import { Matrix4, toRadians } from '@math.gl/core';
import { CCFDatabase } from './ccf-database';
import { Filter } from './interfaces';
import { getSpatialEntity } from './queries/spatial-result-n3';
import { ccf } from './util/prefixes';
import { SpatialEntity } from './spatial-types';


export interface SpatialSceneNode {
  '@id': string;
  type: 'SpatialSceneNode';
  unpickable?: boolean;
  _lighting?: string;
  scenegraph?: string;
  color?: [number, number, number, number];
  transformMatrix: Matrix4;
  tooltip: string;
}

export class CCFSpatialScene {

  constructor(private db: CCFDatabase) {}

  getReferenceBody(filter?: Filter): SpatialEntity {
    return getSpatialEntity(this.db.store, ccf.spatial.BothSexes.id);
  }

  getReferenceSceneNodes(filter?: Filter): SpatialSceneNode[] {
    const wholeBody = getSpatialEntity(this.db.store, ccf.spatial.BothSexes.id);
    const body = this.getReferenceBody(filter);
    const organs = getSpatialEntity(this.db.store, ccf.spatial.FemaleOrgans.id);
    return [
      this.getSceneNode(body, wholeBody, {unpickable: true, color: [255, 255, 255, 1*255]}),
      this.getSceneNode(organs, body, {_lighting: 'pbr', color: [255, 0, 0, 1*255]}),
      {
        color: [255, 255, 255, 0.9*255],
        transformMatrix: Matrix4.from([0.2,0,0,0,0,0.2,0,0,0,0,0.2,0,0,2.4,0,1]),
        tooltip: 'Test BBOX'
      },
      {
        color: [255, 0, 0, 0.9*255],
        transformMatrix: Matrix4.from([0.2,0,0,0,0,0.2,0,0,0,0,0.2,0,0,0,0,1]),
        tooltip: 'Test BBOX'
      }
    ].filter(s => s !== undefined) as SpatialSceneNode[];
  }

  getSceneNode(source: SpatialEntity, target: SpatialEntity, nodeAttrs: Partial<SpatialSceneNode> = {}): SpatialSceneNode | undefined {
    const has3dObject = source.object && source.object.file_format?.startsWith('model/gltf');
    const transform = this.db.graph.getTransformationMatrix(has3dObject && source.object ? source.object['@id'] : source['@id'], target['@id']);
    if (transform) {
      if (has3dObject) {
        transform.rotateX(toRadians(90));
      }
      return {
        '@id': source['@id'], type: 'SpatialSceneNode',
        scenegraph: has3dObject ? source.object?.file : undefined,
        transformMatrix: has3dObject ? new Matrix4() : transform,
        transform,
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
