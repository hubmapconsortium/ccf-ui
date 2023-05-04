/// <reference types="deck.gl" />
import { CompositeLayer } from '@deck.gl/core';
import { SpatialSceneNode } from './shared/spatial-scene-node';
export declare class BodyUILayer extends CompositeLayer<SpatialSceneNode> {
    static readonly layerName = "BodyUILayer";
    static readonly gltfCache: {
        [url: string]: Promise<Blob>;
    };
    initializeState(): void;
    renderLayers(): unknown[];
    getPickingInfo(e: Parameters<CompositeLayer<SpatialSceneNode>['getPickingInfo']>[0]): ReturnType<CompositeLayer<SpatialSceneNode>['getPickingInfo']>;
}
