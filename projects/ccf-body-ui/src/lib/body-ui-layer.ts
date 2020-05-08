// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { load } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { CubeGeometry } from '@luma.gl/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { fromEuler } from 'quaternion';
import toEuler from 'quaternion-to-euler';


const TEST_DATA = [
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
  },
];

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

export class BodyUIData {

}

export class BodyUILayerProps {

}

export const bodyUIDefaultProps: BodyUILayerProps = {

};

export class BodyUILayer<D = any> extends CompositeLayer<D> {
  renderLayers() {
    return [
      new SimpleMeshLayer({
        id: 'test-cubes1',
        pickable: true,
        autoHighlight: true,
        highlightColor: [30, 136, 229, 0.5*255],
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data: TEST_DATA.filter(d => !d.scenegraph),
        getTransformMatrix: (d: any) => getTransformMatrix(d),
        mesh: new CubeGeometry(),
        getColor: (d: any) => d.color || [255, 255, 255, 0.9*255],
        wireframe: false
      }),
      ...TEST_DATA.filter(d => !!d.scenegraph).map((model, i) =>
        new ScenegraphLayer({
          id: 'test-models-' + i,
          pickable: !model.unpickable,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          data: [model],
          scenegraph: load(model.scenegraph, GLTFLoader, {postProcess: true}),
          getTransformMatrix: (d: any) => getTransformMatrix(d),
          getColor: (d: any) => d.color || [0, 255, 0, 0.5*255],
          _lighting: model._lighting,  // 'pbr' | undefined
        } as any)
      )
    ];
  }

  onClick(info: {object: {tooltip: string}}) {
    alert('You clicked ' + info.object?.tooltip || JSON.stringify(info.object, null, 2));
  }

  getPickingInfo(e: {info: object}) {
    return e.info;
  }
}

// Some Deck.gl things to set (which look ugly, but is required)
((BodyUILayer as unknown) as {layerName: string}).layerName = 'BodyUILayer';
((BodyUILayer as unknown) as {defaultProps: BodyUILayerProps}).defaultProps = bodyUIDefaultProps;
