import { SpatialSceneNode } from '../shared/spatial-scene-node';
export declare function registerGLTFLoaders(): void;
export declare function deriveScenegraph(scenegraphNodeName: string, gltf: any): any;
export declare function loadGLTF(model: SpatialSceneNode, cache?: {
    [url: string]: Promise<Blob>;
}): Promise<any>;
export declare function loadGLTF2(scenegraphNodeName: string, gltfPromise: Promise<any>): Promise<any>;
