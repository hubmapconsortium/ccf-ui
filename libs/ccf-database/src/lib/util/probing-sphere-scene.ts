/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4, toRadians } from '@math.gl/core';
import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialSearch } from '../interfaces';
import { SpatialEntity } from '../spatial-types';

type Color = [number, number, number, number];
const gold: Color = [240, 183, 98, 255];
const red: Color = [213, 0, 0, 255];
const green: Color = [29, 204, 101, 255];
const blue: Color = [41, 121, 255, 255];

/**
 * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
 * for a given spatial search.
 * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
 * @param sphere the Spatial Search that defines where and how big the probing sphere is
 * @returns a set of scene nodes for the body-ui
 */
export function getProbingSphereScene(node: SpatialEntity, sphere?: SpatialSearch): SpatialSceneNode[] {
  const sceneWidth = node.x_dimension / 1000;
  const sceneHeight = node.y_dimension / 1000;
  const sceneDepth = node.z_dimension / 1000;
  const defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.07;
  const sphereLineRadius = defaultSphereRadius * 0.05;
  const sphereLineLength = defaultSphereRadius * 2;
  const sphereConeRadius = sphereLineRadius * 4;

  if (!sphere) {
    sphere = {
      target: node.representation_of ?? node['@id'],
      radius: defaultSphereRadius,
      x: sceneWidth / 2,
      y: sceneHeight / 2,
      z: sceneDepth / 2
    };
  } else {
    sphere = {
      ...sphere,
      radius: sphere.radius / 1000,
      x: sphere.x / 1000,
      y: sphere.y / 1000,
      z: sphere.z / 1000
    };
  }

  return [
    // Probing Sphere
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingSphere',
      '@type': 'SpatialSceneNode',
      unpickable: false,
      geometry: 'sphere',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sphere.x, sphere.y, sphere.z]).scale(sphere.radius),
      color: gold
    },
    // Probing Sphere Positive X Axis (D)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXD',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x + sphere.radius + sphereLineLength / 2, sphere.y, sphere.z])
        .rotateZ(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x + sphere.radius + sphereLineLength, sphere.y, sphere.z])
        .rotateZ(toRadians(-90))
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'D',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.y, sphere.z])
        .scale(sphereConeRadius),
      color: red
    },
    // Probing Sphere Negative X Axis (A)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXA',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x - sphere.radius - sphereLineLength / 2, sphere.y, sphere.z])
        .rotateZ(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXACone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x - sphere.radius - sphereLineLength, sphere.y, sphere.z])
        .rotateZ(toRadians(90))
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXALabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'A',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.y, sphere.z])
        .scale(sphereConeRadius),
      color: red
    },
    // Probing Sphere Positive Y Axis (W)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYW',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength / 2, sphere.z])
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength, sphere.z])
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'W',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.z])
        .scale(sphereConeRadius),
      color: green
    },
    // Probing Sphere Negative Y Axis (S)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYS',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength / 2, sphere.z])
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength, sphere.z])
        .rotateZ(toRadians(180))
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'S',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.z])
        .scale(sphereConeRadius),
      color: green
    },
    // Probing Sphere Positive Z Axis (Q)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQ',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength / 2])
        .rotateX(toRadians(90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQCone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength])
        .rotateX(toRadians(90))
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'Q',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength + sphereConeRadius * 3])
        .scale(sphereConeRadius),
      color: blue
    },
    // Probing Sphere Negative Z Axis (E)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZE',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength / 2])
        .rotateX(toRadians(-90))
        .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZECone',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cone',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength])
        .rotateX(toRadians(-90))
        .scale([ sphereConeRadius, sphereConeRadius * 3, sphereConeRadius ]),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZELabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'E',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength - sphereConeRadius * 3.5])
        .scale(sphereConeRadius),
      color: blue
    }
  ];
}
