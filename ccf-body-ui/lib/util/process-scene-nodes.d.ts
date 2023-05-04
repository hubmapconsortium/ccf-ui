import { Matrix4 } from '@math.gl/core';
import { AABB, Vec3 } from 'cannon-es';
import { SpatialSceneNode } from '../shared/spatial-scene-node';
export interface ProcessedNode extends SpatialSceneNode {
    bbox: AABB;
    jsonld: unknown;
    node: unknown;
    size: Vec3;
    center: Vec3;
}
export declare function processSceneNodes(gltfUrl: string, worldMatrix?: Matrix4, scenegraphNode?: string): Promise<{
    [node: string]: ProcessedNode;
}>;
