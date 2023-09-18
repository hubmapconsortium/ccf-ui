import { Euler } from '@math.gl/core';
import { OrientedBoundingBox } from '@math.gl/culling';
import { Store } from 'triple-store-utils';

import { CCFSpatialGraph } from '../ccf-spatial-graph';
import { SpatialSearch } from '../interfaces';
import { getMappedResult } from '../util/n3-functions';
import { ccf } from '../util/prefixes';


const spatialEntityDimensions = {
  [ccf.spatialEntity.x_dimension.id]: 'x',
  [ccf.spatialEntity.y_dimension.id]: 'y',
  [ccf.spatialEntity.z_dimension.id]: 'z'
};

function getSpatialEntityDimensions(store: Store, iri: string): [number, number, number] {
  const dims = getMappedResult<{ x: number; y: number; z: number }>(store, iri, 'Dimensions', spatialEntityDimensions);
  return [ dims.x, dims.y, dims.z ];
}

export function getOrientedBoundingBox(store: Store, graph: CCFSpatialGraph, sourceIri: string, targetIri: string): OrientedBoundingBox | undefined {
  const matrix = graph.getTransformationMatrix(sourceIri, targetIri);
  let result: OrientedBoundingBox | undefined = undefined;
  if (matrix) {
    const center = matrix.getTranslation();
    const halfSize = getSpatialEntityDimensions(store, sourceIri).map(n => n / 1000 / 2);
    const quaternion = new Euler().fromRotationMatrix(matrix, Euler.XYZ).toQuaternion().normalize().calculateW();
    result = new OrientedBoundingBox().fromCenterHalfSizeQuaternion(center as number[], halfSize, quaternion);
  }
  return result;
}

export function filterByProbingSphere(store: Store, graph: CCFSpatialGraph, seen: Set<string>, search: SpatialSearch): Set<string> {
  const { x, y, z, radius, target } = search;
  const newSeen = new Set<string>();
  const radiusSquared = (radius / 1000) * (radius / 1000);
  for (const sourceIri of seen) {
    const boundingBox = getOrientedBoundingBox(store, graph, sourceIri, target);
    if (boundingBox) {
      const distanceSquared = boundingBox.distanceSquaredTo([x, y, z].map(n => n / 1000));
      if (distanceSquared <= radiusSquared) {
        newSeen.add(sourceIri);
      }
    }
  }
  return newSeen;
}
