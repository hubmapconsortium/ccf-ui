import { CCFDatabase } from './ccf-database';
import { Matrix4, toRadians } from '@math.gl/core';
import { DirectedGraph } from 'graphology';
import shortestPath from 'graphology-shortest-path/unweighted';
import { fromEuler } from 'quaternion';
import toEuler from 'quaternion-to-euler';

import { SpatialEntity, SpatialObjectReference, SpatialPlacement } from './spatial-types';
import { rdf, ccf } from './util/prefixes';
import { getSpatialEntity, getSpatialObjectReference, getSpatialPlacement } from './queries/spatial-result-n3';


export function applySpatialPlacement(tx: Matrix4, placement: SpatialPlacement): Matrix4 {
  const p = placement;
  const T = [p.x_translation, p.y_translation, p.z_translation];
  const R_RAD = [p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians);
  // tslint:disable-next-line: no-unsafe-any
  const R = toEuler(fromEuler(R_RAD[1], R_RAD[0], R_RAD[2], 'XYZ').toVector()) as number[];
  const S = [p.x_scaling, p.y_scaling, p.z_scaling];

  return tx.translate(T).rotateXYZ(R).scale(S);
}

export class CCFSpatialGraph {
  graph: DirectedGraph;

  constructor(private db: CCFDatabase) {
    this.createGraph();
  }

  createGraph() {
    this.graph = new DirectedGraph();
    const store = this.db.store;
    // Add all Spatial Object References
    store.forSubjects((subject) => {
      this.addSpatialObjectReference(getSpatialObjectReference(store, subject.id));
    }, rdf.type, ccf.SpatialObjectReference, null);

    // Add all Spatial Entities
    store.forSubjects((subject) => {
      this.addSpatialEntity(getSpatialEntity(store, subject.id));
    }, rdf.type, ccf.SpatialEntity, null);

    // Add all Spatial Placements
    store.forSubjects((subject) => {
      this.addSpatialPlacement(getSpatialPlacement(store, subject.id));
    }, rdf.type, ccf.SpatialPlacement, null);
  }

  addSpatialEntity(entity: SpatialEntity) {
    this.graph.mergeNode(entity['@id'], {type: 'SpatialEntity', object: entity});
  }
  addSpatialObjectReference(ref: SpatialObjectReference) {
    this.graph.mergeNode(ref['@id'], {type: 'SpatialObjectReference', object: ref});
  }
  addSpatialPlacement(placement: SpatialPlacement) {
    this.graph.mergeDirectedEdge(placement.source['@id'], placement.target['@id'], {type: 'SpatialPlacement', placement});
  }

  getTransformationMatrix(sourceIRI: string, targetIRI: string): Matrix4 | undefined {
    if (sourceIRI === targetIRI) {
      return new Matrix4(); // identity
    }
    if (!this.graph.hasNode(sourceIRI) || !this.graph.hasNode(targetIRI)) {
      return undefined;
    }

    const tx = new Matrix4();
    const path = shortestPath(this.graph, sourceIRI, targetIRI);
    if (path && path.length > 0) {
      path.reverse();
      let target: string | number = '';
      for (const source of path) {
        if (target) {
          const p = this.graph.getEdgeAttribute(source, target, 'placement') as SpatialPlacement;
          applySpatialPlacement(tx, p);
        }
        target = source;
      }

      const nodeType = this.graph.getNodeAttribute(sourceIRI, 'type') as string;
      if (nodeType === 'SpatialEntity') {
        const e = this.graph.getNodeAttribute(sourceIRI, 'object') as SpatialEntity;
        if (!e.object) {
          // Scale visible bounding boxes to the desired dimensions
          const scale = [e.x_dimension, e.y_dimension, e.z_dimension];
          tx.scale(scale);
        }
      }

      return tx;
    } else {
      return undefined;
    }
  }
}
