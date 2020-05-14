import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { load, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { CubeGeometry } from '@luma.gl/core';
import { Matrix4 } from '@math.gl/core';


// Programmers Note: had to disable tslint in a few places due to deficient typings.

// tslint:disable-next-line: no-unsafe-any
registerLoaders([DracoWorkerLoader, GLTFLoader]);

export class BodyUIData {
  unpickable?: boolean;
  wireframe?: boolean;
  _lighting?: string;
  scenegraph?: string;
  color?: [number, number, number, number];
  transformMatrix: Matrix4;
  tooltip: string;
}

function loadGLTF(model: BodyUIData): Promise<unknown> {
  // tslint:disable-next-line: no-unsafe-any
  return load(model.scenegraph, GLTFLoader, {DracoLoader, decompress: true, postProcess: true}) as Promise<unknown>;
}

function meshLayer(data: BodyUIData[], options: {[key: string]: unknown}): unknown {
  return new SimpleMeshLayer({
    ...{
      id: 'test-cubes1',
      pickable: true,
      autoHighlight: true,
      highlightColor: [30, 136, 229, 0.5*255],
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      data,
      // tslint:disable-next-line: no-unsafe-any
      mesh: new CubeGeometry(),
      wireframe: false,
      getTransformMatrix: (d) => (d as {transformMatrix: number[][]}).transformMatrix,
      getColor: (d) => (d as {color: [number, number, number, number]}).color || [255, 255, 255, 0.9*255]
    },
    ...options
  });
}

export class BodyUILayer<D = BodyUIData> extends CompositeLayer<D> {
  renderLayers() {
    // tslint:disable-next-line: no-unsafe-any
    const data = (this.state.data || this.props.data) as BodyUIData[];
    const cubes = data.filter(d => !d.scenegraph && !d.wireframe);
    const wireframes = data.filter(d => !d.scenegraph && d.wireframe);
    const models = data.filter(d => !!d.scenegraph);

    return [
      cubes.length ? meshLayer(cubes, {wireframe: false}) : undefined,
      wireframes.length ? meshLayer(wireframes, {wireframe: true}) : undefined,
      ...models.map((model, i) =>
        new ScenegraphLayer({
          ...{
            id: 'test-models-' + i,
            pickable: !model.unpickable,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            data: [model],
            scenegraph: loadGLTF(model),
            _lighting: model._lighting,  // 'pbr' | undefined
            getTransformMatrix: model.transformMatrix,
            getColor: model.color || [0, 255, 0, 0.5*255],
          }
        })
      )
    ].filter(l => !!l);
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
