import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialSearch } from '../interfaces';
import { SpatialEntity } from '../spatial-types';
/**
 * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
 * for a given spatial search.
 * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
 * @param sphere the Spatial Search that defines where and how big the probing sphere is
 * @returns a set of scene nodes for the body-ui
 */
export declare function getProbingSphereScene(node: SpatialEntity, sphere?: SpatialSearch): SpatialSceneNode[];
