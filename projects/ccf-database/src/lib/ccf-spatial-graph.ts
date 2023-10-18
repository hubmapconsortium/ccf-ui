/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Euler, Matrix4, toDegrees, toRadians } from '@math.gl/core';
import * as graphology from 'graphology';
import shortestPath from 'graphology-shortest-path/unweighted';
import get from 'lodash/get';
import { readQuads } from 'triple-store-utils';
import { v4 as uuidV4 } from 'uuid';

import { CCFDatabase } from './ccf-database';
import { getSpatialPlacement } from './queries/spatial-result-n3';
import { FlatSpatialPlacement, SpatialEntity, SpatialPlacement } from './spatial-types';
import { ccf, rdf } from './util/prefixes';

// Ugly workaround to make ccf database work both on the browser and node.js 18+
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DirectedGraph = ((graphology.default || graphology) as any).DirectedGraph;

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
    for (const quad of readQuads(store, null, ccf.spatialPlacement.source, null, null)) {
      edgeSource[quad.subject.id] = quad.object.id;
    }
    for (const quad of readQuads(store, null, ccf.spatialPlacement.target, null, null)) {
      const source = edgeSource[quad.subject.id];
      if (source) {
        this.addEdge(quad.subject.id, source, quad.object.id, 'SpatialPlacement');
      }
    }
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

  getSpatialPlacement(source: SpatialEntity, targetIri: string): FlatSpatialPlacement | undefined {
    const sourceIri = this.graph.hasNode(source['@id']) ? source['@id'] : undefined;
    const placement: SpatialPlacement = get(source, 'placement[0]', get(source, 'placement', undefined))!;

    let matrix: Matrix4 | undefined;
    if (placement && this.graph.hasNode(placement.target)) {
      matrix = this.getTransformationMatrix(placement.target as unknown as string, targetIri);
      if (matrix) {
        matrix = applySpatialPlacement(matrix, placement);
      }
    } else if (sourceIri) {
      matrix = this.getTransformationMatrix(sourceIri, targetIri);
    }

    if (matrix) {
      const euler = new Euler().fromRotationMatrix(matrix, Euler.XYZ);
      const T = matrix.getTranslation().map(n => n * 1000) as [number, number, number];
      const R = euler.toVector3().map<number>(toDegrees) as [number, number, number];
      const S = matrix.getScale().map(n => n < 1 && n > 0.999999 ? 1 : n) as [number, number, number];

      return {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': `http://purl.org/ccf/1.5/${uuidV4()}_placement`,
        '@type': 'SpatialPlacement',
        source: source['@id'],
        target: targetIri,
        placement_date: new Date().toISOString().split('T')[0],
        x_scaling: S[0],
        y_scaling: S[1],
        z_scaling: S[2],
        scaling_units: 'ratio',
        x_rotation: R[0],
        y_rotation: R[1],
        z_rotation: R[2],
        rotation_order: 'XYZ',
        rotation_units: 'degree',
        x_translation: T[0],
        y_translation: T[1],
        z_translation: T[2],
        translation_units: 'millimeter'
      };
    } else {
      return undefined;
    }
  }
}
