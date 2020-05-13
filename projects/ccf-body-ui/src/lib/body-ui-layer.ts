import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { load, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { CubeGeometry } from '@luma.gl/core';
import { Matrix4 } from '@math.gl/core';
import { SimpleMesh } from '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer';


// Programmers Note: had to disable tslint in a few places due to deficient typings.

// tslint:disable-next-line: no-unsafe-any
registerLoaders([DracoWorkerLoader, GLTFLoader]);

export class BodyUIData {
  unpickable?: boolean;
  _lighting?: string;
  scenegraph?: string;
  color?: [number, number, number, number];
  transformMatrix: Matrix4;
  tooltip: string;
}

export class BodyUILayerProps {

}

export const bodyUIDefaultProps: BodyUILayerProps = {

};

// tslint:disable-next-line: no-any
class CachedGLTFLoader<T = any> {
  private urlToLoader: {[url: string]: {url: string}} = {};
  private loaderToScenegraph: WeakMap<{url: string}, Promise<T>> = new WeakMap();

  load(url: string): Promise<T> {
    const urlObj = this.urlToLoader[url] = this.urlToLoader[url] || {url};
    if (!this.loaderToScenegraph.has(urlObj)) {
      // tslint:disable-next-line: no-unsafe-any
      this.loaderToScenegraph.set(urlObj, load(url, GLTFLoader, {DracoLoader, decompress: true, postProcess: true}));
    }
    return this.loaderToScenegraph.get(urlObj) as Promise<T>;
  }
}
const gltfLoader = new CachedGLTFLoader();

export class BodyUILayer<D = BodyUIData> extends CompositeLayer<D> {
  renderLayers() {
    // tslint:disable-next-line: no-unsafe-any
    const data = (this.state.data || this.props.data) as BodyUIData[];
    return data.length === 0 ? [] : [
      new SimpleMeshLayer({
        ...{
          id: 'test-cubes1',
          pickable: true,
          autoHighlight: true,
          highlightColor: [30, 136, 229, 0.5*255],
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          data: data.filter((d) => !d.scenegraph),
          mesh: new (CubeGeometry as new () => SimpleMesh)(),
          wireframe: false,
          getTransformMatrix: (d) => (d as {transformMatrix: number[][]}).transformMatrix,
          getColor: (d) => (d as {color: [number, number, number, number]}).color || [255, 255, 255, 0.9*255]
        }
      }),
      data.filter(d => !!d.scenegraph).map((model, i) =>
        new ScenegraphLayer({
          ...{
            id: 'test-models-' + i,
            pickable: !model.unpickable,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            data: [model],
            scenegraph: gltfLoader.load(model.scenegraph as string),
            _lighting: model._lighting,  // 'pbr' | undefined
            getTransformMatrix: model.transformMatrix,
            getColor: model.color || [0, 255, 0, 0.5*255],
          }
        })
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
