/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4, toRadians } from '@math.gl/core';
import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialEntity, SpatialPlacement } from '../spatial-types';


type Color = [number, number, number, number];
const gray: Color = [204, 204, 204, 255];
const red: Color = [213, 0, 0, 255];
const green: Color = [29, 204, 101, 255];
const blue: Color = [41, 121, 255, 255];

/**
 * Create a set of scene nodes for the body-ui to show the lines around a cube
 *
 * @param node the Spatial Entity that the scene is drawn around
 * @param placement the Spatial Placement where the cube is placed
 * @returns a set of scene nodes for the body-ui
 */
export function getTissueBlockScene(node: SpatialEntity, placement: SpatialPlacement): SpatialSceneNode[] {
  const sceneWidth = node.x_dimension / 1000;
  const sceneHeight = node.y_dimension / 1000;
  const sceneDepth = node.z_dimension / 1000;
  const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.1;
  const defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth);
  const sphereLineRadius = defaultSphereRadius * 0.05;
  const sphereLineLength = defaultSphereRadius * 2;
  const sphereConeRadius = sphereLineRadius * 4;

  const cube = {
    radius: defaultSphereRadius / 1000 / 2,
    x: placement.x_translation / 1000,
    y: placement.y_translation / 1000,
    z: placement.z_translation / 1000,

    rx: toRadians(placement.x_rotation),
    ry: toRadians(placement.y_rotation),
    rz: toRadians(placement.z_rotation),

    sx: node.x_dimension / 1000,
    sy: node.y_dimension / 1000,
    sz: node.z_dimension / 1000,
  };

  return [
    // Carbon Rod Sphere
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginSphere',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'sphere',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z])
        .rotateXYZ([cube.rx, cube.ry, cube.rz]).multiplyRight(
          new Matrix4(Matrix4.IDENTITY)
            .translate([- cube.sx / 2, - cube.sy / 2, - cube.sz / 2])
            .scale(originRadius)),
      color: gray
    },
    // Carbon Rod X Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginX',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z])
        .rotateXYZ([cube.rx, cube.ry, cube.rz])
        .multiplyRight(new Matrix4(Matrix4.IDENTITY)
          .translate([0, - cube.sy / 2, - cube.sz / 2])
          .rotateZ(toRadians(-90))
          .scale([sphereLineRadius, cube.sx, sphereLineRadius])),
      color: red
    },
    // Carbon Rod Y Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginY',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix:
      new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z])
        .rotateXYZ([cube.rx, cube.ry, cube.rz])
        .multiplyRight(new Matrix4(Matrix4.IDENTITY)
          .translate([- cube.sx / 2, 0, - cube.sz / 2])
          .scale([sphereLineRadius, cube.sy, sphereLineRadius])),
      color: green
    },
    // Carbon Rod Z Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginZ',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z])
        .rotateXYZ([cube.rx, cube.ry, cube.rz])
        .multiplyRight(new Matrix4(Matrix4.IDENTITY)
          .translate([- cube.sx / 2, - cube.sy / 2, 0])
          .rotateX(toRadians(90))
          .scale([sphereLineRadius, cube.sz, sphereLineRadius])),
      color: blue
    },
    // Cube Positive X Axis (D)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXD',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x + cube.radius + sphereLineLength / 2, cube.y, cube.z])
        .rotateZ(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXDCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x + cube.radius + sphereLineLength, cube.y, cube.z])
        .rotateZ(toRadians(-90))
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXDLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'D',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x + cube.radius + sphereLineLength + sphereConeRadius * 3, cube.y, cube.z])
        .scale(sphereConeRadius),
      color: red
    },
    // Cube Negative X Axis (A)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXA',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x - cube.radius - sphereLineLength / 2, cube.y, cube.z])
        .rotateZ(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXACone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x - cube.radius - sphereLineLength, cube.y, cube.z])
        .rotateZ(toRadians(90))
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXALabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'A',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x - cube.radius - sphereLineLength - sphereConeRadius * 3.5, cube.y, cube.z])
        .scale(sphereConeRadius),
      color: red
    },
    // Cube Positive Y Axis (W)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYW',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y + cube.radius + sphereLineLength / 2, cube.z])
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYWCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y + cube.radius + sphereLineLength, cube.z])
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYWLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'W',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y + cube.radius + sphereLineLength + sphereConeRadius * 3, cube.z])
        .scale(sphereConeRadius),
      color: green
    },
    // Cube Negative Y Axis (S)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYS',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y - cube.radius - sphereLineLength / 2, cube.z])
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYSCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y - cube.radius - sphereLineLength, cube.z])
        .rotateZ(toRadians(180))
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYSLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'S',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y - cube.radius - sphereLineLength - sphereConeRadius * 3.5, cube.z])
        .scale(sphereConeRadius),
      color: green
    },
    // Cube Positive Z Axis (Q)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQ',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength / 2])
        .rotateX(toRadians(90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength])
        .rotateX(toRadians(90))
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'Q',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength + sphereConeRadius * 3])
        .scale(sphereConeRadius),
      color: blue
    },
    // Cube Negative Z Axis (E)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZE',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength / 2])
        .rotateX(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZECone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength])
        .rotateX(toRadians(-90))
        .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZELabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'E',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength - sphereConeRadius * 3.5])
        .scale(sphereConeRadius),
      color: blue
    }
  ];
}
