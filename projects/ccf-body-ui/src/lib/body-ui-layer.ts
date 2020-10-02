import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { CubeGeometry } from '@luma.gl/core';

import { SpatialSceneNode } from './shared/spatial-scene-node';
import { loadGLTF, registerGLTFLoaders } from './util/load-gltf';
import { doCollisions } from './util/spatial-scene-collider';


function meshLayer(id: string, data: SpatialSceneNode[], options: {[key: string]: unknown}): SimpleMeshLayer<unknown> | undefined {
  if (!data || data.length === 0) {
    return undefined;
  } else {
    return new SimpleMeshLayer({
      ...{
        id,
        pickable: true,
        autoHighlight: true,
        highlightColor: [30, 136, 229, 255],
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data,
        // tslint:disable-next-line: no-any
        mesh: new CubeGeometry() as any,
        wireframe: false,
        getTransformMatrix: (d) => (d as {transformMatrix: number[][]}).transformMatrix,
        getColor: (d) => (d as {color: [number, number, number, number]}).color || [255, 255, 255, 0.9*255]
      },
      ...options
    });
  }
}

export class BodyUILayer extends CompositeLayer<SpatialSceneNode> {
  static readonly layerName = 'BodyUILayer';
  static readonly gltfCache: {[url: string]: Promise<Blob>} = {};

  initializeState(): void {
    const { data } = this.props;
    this.setState({data: data || [], zoomOpacity: 0.8, doCollisions: false});
    registerGLTFLoaders();
  }

  renderLayers(): unknown[] {
    const state = this.state as {data: SpatialSceneNode[], zoomOpacity: number, doCollisions: boolean};
    const cubes = state.data.filter(d => !d.scenegraph && !d.wireframe);
    const wireframes = state.data.filter(d => !d.scenegraph && d.wireframe);
    const models = state.data.filter(d => !!d.scenegraph);

    if (state.doCollisions) {
      doCollisions(state.data);
    }

    return [
      meshLayer('cubes', cubes, {wireframe: false}),
      meshLayer('wireframes', wireframes, {wireframe: true, pickable: false}),
      ...models.map((model) =>
        new ScenegraphLayer({
          id: 'models-' + model['@id'],
          opacity: model.zoomBasedOpacity ? state.zoomOpacity : 1.0,
          pickable: !model.unpickable,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          data: [model],
          scenegraph: model.scenegraphNode ?
            loadGLTF(model, BodyUILayer.gltfCache) :
            model.scenegraph as unknown as URL,
          _lighting: model._lighting,  // 'pbr' | undefined
          getTransformMatrix: model.transformMatrix as unknown as number[][],
          getColor: model.color || [0, 255, 0, 0.5*255],
        })
      )
    ].filter(l => !!l);
  }

  getPickingInfo(e: {info: object}): unknown {
    return e.info;
  }
}
