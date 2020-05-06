// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { CompositeLayerProps } from '@deck.gl/core/lib/composite-layer';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { load, registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { CubeGeometry } from '@luma.gl/core';

// ScenegraphLayer will automatically pick the right
// loader for the file type from the registered loaders.
registerLoaders([GLTFLoader]);

const TEST_CUBES = [
  {
    color: [255, 0, 0, 0.5*255],
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Left Kidney BBOX'
  }
];

const AVOCADO = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Avocado/glTF-Binary/Avocado.glb';
const TEST_MODEL = {
    scenegraph: load(AVOCADO, {postProcess: true}),
    // color: [255, 0, 0, 0.5*255],
    position: [0, 0, 0],
    scale: [20, 20, 20],
    rotation: [0, 0, 0],
    translation: [0, 0, 0],
    tooltip: 'Left Kidney BBOX'
}

export class BodyUIData {

}

export class BodyUILayerProps implements CompositeLayerProps<BodyUIData> {

}

export const bodyUIDefaultProps: BodyUILayerProps = {

};

export class BodyUILayer extends CompositeLayer<BodyUIData> {
  avacado: any;

  renderLayers() {
    return [
      new SimpleMeshLayer({
        id: 'test-cubes',
        pickable: true,
        wireframe: true,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data: TEST_CUBES,
        getPosition: (d: any) => d.position || [0, 0, 0],
        getScale: (d: any) => d.scale,
        getOrientation: (d: any) => d.rotation,
        getTranslation: (d: any) => d.translation,
        getColor: (d: any) => d.color || [0, 255, 0, 0.1*255],
        mesh: new CubeGeometry()
      } as any),
      new ScenegraphLayer({
        id: 'test-models',
        pickable: false,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data: [TEST_MODEL],
        scenegraph: TEST_MODEL.scenegraph,
        getPosition: (d: any) => d.position || [0, 0, 0],
        getScale: (d: any) => d.scale,
        getOrientation: (d: any) => d.rotation,
        getTranslation: (d: any) => d.translation,
        // getColor: (d: any) => d.color || [0, 0, 255, 5],
        // _lighting: 'pbr', // pbr
      } as any)
    ];
  }
}

// Some Deck.gl things to set (which look ugly, but is required)
((BodyUILayer as unknown) as {layerName: string}).layerName = 'BodyUILayer';
((BodyUILayer as unknown) as {defaultProps: BodyUILayerProps}).defaultProps = bodyUIDefaultProps;
