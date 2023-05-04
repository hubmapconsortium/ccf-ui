import { Matrix4 } from '@math.gl/core';
import { CCFDatabase } from './ccf-database';
import { FlatSpatialPlacement, SpatialEntity, SpatialPlacement } from './spatial-types';
export declare function applySpatialPlacement(tx: Matrix4, placement: SpatialPlacement): Matrix4;
export declare class CCFSpatialGraph {
    private db;
    graph: any;
    constructor(db: CCFDatabase);
    createGraph(): void;
    addNode(id: string, type: string): void;
    addEdge(id: string, source: string, target: string, type: string): void;
    getTransformationMatrix(sourceIRI: string, targetIRI: string): Matrix4 | undefined;
    getSpatialPlacement(source: SpatialEntity, targetIri: string): FlatSpatialPlacement | undefined;
}
