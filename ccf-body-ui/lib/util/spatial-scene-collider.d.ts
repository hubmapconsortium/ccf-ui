import { SpatialSceneNode } from '../shared/spatial-scene-node';
interface Collision {
    '@id': string;
    name: string;
    hits: {
        '@id': string;
        name: string;
    }[];
}
export declare function doCollisions(scene: SpatialSceneNode[]): Promise<Collision[]>;
export {};
