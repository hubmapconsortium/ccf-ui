import { Euler, Matrix3 } from '@math.gl/core';
import { OrientedBoundingBox } from '@math.gl/culling';
import { Store } from 'triple-store-utils';

import { CCFSpatialGraph } from '../ccf-spatial-graph';
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
  if (matrix) {
    const dimensions = getSpatialEntityDimensions(store, sourceIri);
    const translation = matrix.getTranslation();
    const euler = new Euler().fromRotationMatrix(matrix, Euler.XYZ);
    const halfAxes = new Matrix3(Matrix3.IDENTITY)
      .fromQuaternion(euler.toQuaternion())
      .scale(dimensions.map(n => n / 1000 / 1000));
    return new OrientedBoundingBox(translation, halfAxes);
  }
  return;
}

export function filterByProbingSphere(store: Store, graph: CCFSpatialGraph, seen: Set<string>, x: number, y: number, z: number, radius: number, targetIri: string): Set<string> {
  const newSeen = new Set<string>();
  radius /= 1000;
  const radiusSquared = radius * radius;
  for (const sourceIri of seen) {
    const boundingBox = getOrientedBoundingBox(store, graph, sourceIri, targetIri);
    if (boundingBox) {
      const distanceSquared = boundingBox.distanceSquaredTo([x, y, z].map(n => n / 1000));
      if (distanceSquared < radiusSquared) {
        newSeen.add(sourceIri);
      }
    }
  }
  return newSeen;
}
