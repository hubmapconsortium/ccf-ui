// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { CompositeLayerProps } from '@deck.gl/core/lib/composite-layer';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { load, registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { CubeGeometry } from '@luma.gl/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { fromEuler } from 'quaternion';
import toEuler from 'quaternion-to-euler';

// ScenegraphLayer will automatically pick the right
// loader for the file type from the registered loaders.
registerLoaders([GLTFLoader]);

const TEST_DATA = [
  {
    color: [255, 255, 255, 1*255],
    position: [0, 2, 0],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Left Kidney BBOX'
  },
  {
    scenegraph: load('/assets/test-data/VHF_Heart_Kidney_Spleen.glb', {postProcess: true}),
    color: [255, 0, 0, 1*255],
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'VHF Organs',
    _lighting: 'pbr'
  },
  {
    scenegraph: load('/assets/test-data/both-sexes-torso.glb', {postProcess: true}),
    color: [255, 255, 255, 1*255],
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Torso Backdrop',
    _lighting: undefined
  },
];

function getTransformMatrix(model: any): Matrix4 {
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

export class BodyUILayerProps implements CompositeLayerProps<BodyUIData> {

}

export const bodyUIDefaultProps: BodyUILayerProps = {

};

export class BodyUILayer<D = any> extends CompositeLayer<D> {
  avacado: any;

  renderLayers() {
    return [
      new SimpleMeshLayer({
        id: 'test-cubes1',
        pickable: true,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data: TEST_DATA.filter(d => !d.scenegraph),
        getTransformMatrix: (d: any) => getTransformMatrix(d),
        mesh: new CubeGeometry(),
        getColor: (d: any) => d.color || [0, 255, 0, 0.1*255],
        onHover: (info: any) => console.log(info),
        onClick: (info: any) => console.log(info),
        wireframe: false
      }),
      ...TEST_DATA.filter(d => !!d.scenegraph).map((model, i) =>
        new ScenegraphLayer({
          id: 'test-models-' + i,
          pickable: true,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          data: [model],
          scenegraph: model.scenegraph,
          getTransformMatrix: (d: any) => getTransformMatrix(d),
          getColor: (d: any) => d.color || [0, 255, 0, 0.5*255],
          onHover: (info: any) => console.log(info),
          onClick: (info: any) => console.log(info),
          _lighting: model._lighting,  // 'pbr' | undefined
        } as any)
      )
    ];
  }
}

// Some Deck.gl things to set (which look ugly, but is required)
((BodyUILayer as unknown) as {layerName: string}).layerName = 'BodyUILayer';
((BodyUILayer as unknown) as {defaultProps: BodyUILayerProps}).defaultProps = bodyUIDefaultProps;
