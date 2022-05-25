import { Matrix4, toRadians } from '@math.gl/core';
import { SpatialSceneNode } from '../ccf-spatial-scene';
import { SpatialSearch } from '../interfaces';
import { SpatialEntity } from '../spatial-types';

type Color = [number, number, number, number];
const gold: Color = [240, 183, 98, 255];
const gray: Color = [204, 204, 204, 255];
const red: Color = [213, 0, 0, 255];
const green: Color = [29, 204, 101, 255];
const blue: Color = [41, 121, 255, 255];

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
    // Probing Sphere Positive Z Axis (E)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZE',
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
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZECone',
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
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZELabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'E',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength + sphereConeRadius * 3])
        .scale(sphereConeRadius),
      color: blue
    },
    // Probing Sphere Negative Z Axis (Q)
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQ',
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
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQCone',
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
      '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'Q',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength - sphereConeRadius * 3.5])
        .scale(sphereConeRadius),
      color: blue
    }
  ];
}

export function getOriginScene(node: SpatialEntity, includeLetters = false): SpatialSceneNode[] {
  const sceneWidth = node.x_dimension / 1000;
  const sceneHeight = node.y_dimension / 1000;
  const sceneDepth = node.z_dimension / 1000;
  const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
  const lineRadius = originRadius * 0.1;

  return [
    // Origin Sphere
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'sphere',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).scale(originRadius),
      color: gray
    },
    // Origin X Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
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
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([-originRadius * 2, 0, 0]).scale(originRadius),
      color: red
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'D',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sceneWidth + originRadius * 2, 0, 0]).scale(originRadius),
      color: red
    },
    // Origin Y Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
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
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, originRadius * 1.5, 0]).scale(originRadius),
      color: green
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'W',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, sceneHeight + originRadius * 2, 0]).scale(originRadius),
      color: green
    },
    // Origin Z Axis
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'cylinder',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
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
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, - originRadius * 1.5, 0]).scale(originRadius),
      color: blue
    },
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
      '@type': 'SpatialSceneNode',
      unpickable: true,
      geometry: 'text',
      text: 'E',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, 0, sceneDepth + originRadius * 2]).scale(originRadius),
      color: blue
    }
  ].filter(n => (includeLetters && n.geometry === 'text' && n.text) || !n.text) as SpatialSceneNode[];
}
