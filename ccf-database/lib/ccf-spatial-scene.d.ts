import { Matrix4 } from '@math.gl/core';
import { CCFDatabase } from './ccf-database';
import { Filter } from './interfaces';
import { ExtractionSet, SpatialEntity } from './spatial-types';
export declare type SpatialSceneGeometry = 'sphere' | 'cube' | 'wireframe' | 'text' | 'cone' | 'cylinder';
export interface SpatialSceneNode {
    '@id': string;
    '@type': string;
    entityId?: string;
    ccf_annotations?: string[];
    representation_of?: string;
    reference_organ?: string;
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
export declare class CCFSpatialScene {
    private db;
    constructor(db: CCFDatabase);
    getSpatialEntity(iri: string): SpatialEntity;
    getExtractionSets(iri: string): ExtractionSet[];
    getExtractionSet(iri: string): ExtractionSet;
    getAnatomicalStructures(iri: string): SpatialEntity[];
    getReferenceOrgans(): SpatialEntity[];
    getReferenceBody(filter?: Filter): SpatialEntity;
    getReferenceOrganSets(filter?: Filter): SpatialEntity[];
    getReferenceSceneNodes(filter?: Filter): SpatialSceneNode[];
    getReferenceOrganScene(organIri: string, filter?: Filter): SpatialSceneNode[];
    getEntitySceneNodes(filter?: Filter): SpatialSceneNode[];
    getSceneNode(source: SpatialEntity, target: SpatialEntity, nodeAttrs?: Partial<SpatialSceneNode>): SpatialSceneNode | undefined;
    getScene(filter?: Filter): SpatialSceneNode[];
}
