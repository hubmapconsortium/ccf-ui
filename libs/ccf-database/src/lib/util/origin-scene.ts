/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4, toRadians } from '@math.gl/core';
import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialEntity } from '../spatial-types';


type Color = [number, number, number, number];
const gray: Color = [204, 204, 204, 255];
const red: Color = [213, 0, 0, 255];
const green: Color = [29, 204, 101, 255];
const blue: Color = [41, 121, 255, 255];

/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @param centered whether to center the organ at the origin point
 * @returns a set of scene nodes for the body-ui
 */
export function getOriginScene(node: SpatialEntity, includeLetters = false, centered = false): SpatialSceneNode[] {
  const sceneWidth = node.x_dimension / 1000;
  const sceneHeight = node.y_dimension / 1000;
  const sceneDepth = node.z_dimension / 1000;
  const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
  const lineRadius = originRadius * 0.1;
  const globalTranslation = centered ? [ sceneWidth, sceneHeight, sceneDepth ].map(n => n * -0.5) : [ 0, 0, 0 ];

  return [
    // Origin Sphere
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'sphere',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .scale(originRadius),
      color: gray
    },
    // Origin X Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([sceneWidth / 2, 0, 0])
        .rotateZ(toRadians(-90))
        .scale([lineRadius, sceneWidth, lineRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([sceneWidth, 0, 0])
        .rotateZ(toRadians(-90))
        .scale([ originRadius, originRadius * 3, originRadius ]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXALabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'A',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([-originRadius * 2, 0, 0])
        .scale(originRadius),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'D',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([sceneWidth + originRadius * 2, 0, 0])
        .scale(originRadius),
      color: red
    },
    // Origin Y Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, sceneHeight / 2, 0])
        .scale([lineRadius, sceneHeight, lineRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, sceneHeight, 0])
        .scale([ originRadius, originRadius * 3, originRadius ]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYSLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'S',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([originRadius * 1.5, originRadius * 1.5, 0])
        .scale(originRadius),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'W',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, sceneHeight + originRadius * 2, 0])
        .scale(originRadius),
      color: green
    },
    // Origin Z Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, 0, sceneDepth / 2])
        .rotateX(toRadians(90))
        .scale([lineRadius, sceneDepth, lineRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, 0, sceneDepth])
        .rotateX(toRadians(90))
        .scale([ originRadius, originRadius * 3, originRadius ]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZQLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'Q',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([originRadius * 1.5, - originRadius * 1.5, 0])
        .scale(originRadius),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'E',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate(globalTranslation)
        .translate([0, 0, sceneDepth + originRadius * 2])
        .scale(originRadius),
      color: blue
    }
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  ].filter(n => (includeLetters && n.geometry === 'text' && n.text) || !n.text) as SpatialSceneNode[];
}
