import { Matrix4 } from '@math.gl/core';


export interface SpatialSceneNode {
  '@id': string;
  '@type': string;
  entityId?: string;
  unpickable?: boolean;
  wireframe?: boolean;
  _lighting?: string;
  scenegraph?: string;
  scenegraphNode?: string;
  zoomBasedOpacity?: boolean;
  zoomToOnLoad?: boolean;
  color?: [number, number, number, number];
  opacity?: number;
  transformMatrix: Matrix4;
  tooltip?: string;
}
