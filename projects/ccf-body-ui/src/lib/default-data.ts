import { Matrix4, toRadians } from '@math.gl/core';
import { fromEuler } from 'quaternion';
import toEuler from 'quaternion-to-euler';
import { BodyUIData } from './body-ui-layer';

const DEFAULT_DATA_INPUT = [
  {
    color: [255, 255, 255, 0.9*255],
    position: [0, 2.4, 0],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Test BBOX'
  },
  {
    scenegraph: '/assets/test-data/VHF_Heart_Kidney_Spleen.glb',
    color: [255, 0, 0, 1*255],
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'VHF Organs',
    _lighting: 'pbr'
  },
  {
    scenegraph: '/assets/test-data/both-sexes-torso.glb',
    unpickable: true,
    color: [255, 255, 255, 1*255],
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Torso Backdrop',
    _lighting: undefined
  } as unknown,
];

// tslint:disable: no-unsafe-any
// tslint:disable-next-line: no-any
function getTransformMatrix(model: any): Matrix4 {
  const tx = new Matrix4([]).identity();
  const P: number[] = model.position;
  const T: number[] = model.translation;
  const R_RAD = model.rotation.map(toRadians);
  const R = toEuler(fromEuler(R_RAD[1], R_RAD[0], R_RAD[2], 'XYZ').toVector());
  const S: number[] = model.scale;

  return tx
    .translate(P)
    .translate(T)
    .rotateXYZ(R)
    .scale(S);
}
// tslint:disable: no-unsafe-any

DEFAULT_DATA_INPUT.forEach((t: BodyUIData) => t.transformMatrix = getTransformMatrix(t));

export const DEFAULT_DATA: BodyUIData[] = DEFAULT_DATA_INPUT as BodyUIData[];
