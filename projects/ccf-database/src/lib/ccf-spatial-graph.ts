/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Matrix4, toRadians } from '@math.gl/core';
import { DirectedGraph } from 'graphology';
import shortestPath from 'graphology-shortest-path/unweighted';

import { CCFDatabase } from './ccf-database';
import { getSpatialPlacement } from './queries/spatial-result-n3';
import { SpatialPlacement } from './spatial-types';
import { ccf, rdf } from './util/prefixes';


export function applySpatialPlacement(tx: Matrix4, placement: SpatialPlacement): Matrix4 {
  const p = placement;
  let factor: number;
  switch (p.translation_units) {
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
  const T = [p.x_translation, p.y_translation, p.z_translation].map(t => t * factor);
  const R = [p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians) as [number, number, number];
  const S = [p.x_scaling, p.y_scaling, p.z_scaling];

  return tx.translate(T).rotateXYZ(R).scale(S);
}

export class CCFSpatialGraph {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graph: any;

  constructor(private db: CCFDatabase) {
    this.createGraph();
  }

  createGraph(): void {
    this.graph = new DirectedGraph();
    const store = this.db.store;

    // Add all Spatial Object References
    store.forSubjects((subject) => {
      this.addNode(subject.id, 'SpatialObjectReference');
    }, rdf.type, ccf.SpatialObjectReference, null);

    // Add all Spatial Entities
    store.forSubjects((subject) => {
      this.addNode(subject.id, 'SpatialEntity');
    }, rdf.type, ccf.SpatialEntity, null);

    // Add all Spatial Placements
    const edgeSource: Record<string, string> = {};
    store.some((quad) => {
      edgeSource[quad.subject.id] = quad.object.id;
      return false;
    }, null, ccf.spatialPlacement.source, null, null);
    store.some((quad) => {
      const source = edgeSource[quad.subject.id];
      if (source) {
        this.addEdge(quad.subject.id, source, quad.object.id, 'SpatialPlacement');
      }
      return false;
    }, null, ccf.spatialPlacement.target, null, null);
  }

  addNode(id: string, type: string): void {
    this.graph.mergeNode(id, { type });
  }

  addEdge(id: string, source: string, target: string, type: string): void {
    this.graph.mergeDirectedEdge(source, target, { type, id });
  }

  getTransformationMatrix(sourceIRI: string, targetIRI: string): Matrix4 | undefined {
    if (sourceIRI === targetIRI) {
      return new Matrix4(Matrix4.IDENTITY); // identity
    }
    if (!this.graph.hasNode(sourceIRI) || !this.graph.hasNode(targetIRI)) {
      return undefined;
    }

    const store = this.db.store;
    const tx = new Matrix4(Matrix4.IDENTITY);
    const path = shortestPath(this.graph, sourceIRI, targetIRI);
    if (path && path.length > 0) {
      path.reverse();
      let target: string | number = '';
      for (const source of path) {
        if (target) {
          const placementId = this.graph.getEdgeAttribute(source, target, 'id');
          const placement = getSpatialPlacement(store, placementId);
          applySpatialPlacement(tx, placement);
        }
        target = source;
      }
      return tx;
    } else {
      return undefined;
    }
  }
}
