/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4 } from '@math.gl/core';

export type SpatialSceneGeometry = 'sphere' | 'cube' | 'wireframe' | 'text' | 'cone' | 'cylinder';

export interface SpatialSceneNode {
  '@id': string;
  '@type': string;
  entityId?: string;
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
