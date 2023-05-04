import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialEntity } from '../spatial-types';
/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @returns a set of scene nodes for the body-ui
 */
export declare function getOriginScene(node: SpatialEntity, includeLetters?: boolean): SpatialSceneNode[];
