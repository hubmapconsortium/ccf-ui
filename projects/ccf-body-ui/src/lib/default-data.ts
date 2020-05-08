// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import { Matrix4, toRadians } from '@math.gl/core';
import { fromEuler } from 'quaternion';
import toEuler from 'quaternion-to-euler';
import { BodyUIData } from './body-ui-layer';

export const DEFAULT_DATA = [
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
] as BodyUIData[];

function getTransformMatrix(model: any): number[][] /*Matrix4*/ {
  const tx = new Matrix4([]).identity();
  const P: number[] = model.position;
  const T: number[] = model.translation.map(toRadians);
  const R: any = toEuler(fromEuler(model.rotation[0], model.rotation[1], model.rotation[2], 'XYZ').toVector());
  const S: number[] = model.scale;

  tx
    .translate(P)
    .translate(T)
    .rotateXYZ(R)
    .scale(S);

  return tx;
}

DEFAULT_DATA.forEach((t: any) => t.transformMatrix = getTransformMatrix(t));
