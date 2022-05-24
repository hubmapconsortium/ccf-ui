/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CompositeLayer, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { CubeGeometry, SphereGeometry } from '@luma.gl/core';

import { SpatialSceneNode } from './shared/spatial-scene-node';
import { loadGLTF, loadGLTF2, registerGLTFLoaders } from './util/load-gltf';
import { doCollisions } from './util/spatial-scene-collider';


function meshLayer(id: string, data: SpatialSceneNode[], options: { [key: string]: unknown }): SimpleMeshLayer<unknown> | undefined {
  if (!data || data.length === 0) {
    return undefined;
  } else {
    return new SimpleMeshLayer({
      ...{
        id,
        pickable: true,
        autoHighlight: false,
        highlightColor: [30, 136, 229, 255],
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        data,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mesh: new CubeGeometry() as any,
        wireframe: false,
        getTransformMatrix: (d) => (d as { transformMatrix: number[][] }).transformMatrix,
        getColor: (d) => (d as { color: [number, number, number, number] }).color || [255, 255, 255, 0.9*255]
      },
      ...options
    });
  }
}

export class BodyUILayer extends CompositeLayer<SpatialSceneNode> {
  static readonly layerName = 'BodyUILayer';
  static readonly gltfCache: { [url: string]: Promise<Blob> } = {};

  initializeState(): void {
    const { data } = this.props;
    this.setState({ data: data ?? [], zoomOpacity: 0.8, doCollisions: false });
    registerGLTFLoaders();
  }

  renderLayers(): unknown[] {
    const state = this.state as { data: SpatialSceneNode[]; zoomOpacity: number; doCollisions: boolean };
    const spheres = state.data.filter(d => d.sphere && !d.scenegraph && !d.wireframe && d.unpickable);
    const pickableSpheres = state.data.filter(d => d.sphere && !d.scenegraph && !d.wireframe && !d.unpickable);
    const cubes = state.data.filter(d => !d.sphere && !d.scenegraph && !d.wireframe && d.unpickable);
    const pickableCubes = state.data.filter(d => !d.sphere && !d.scenegraph && !d.wireframe && !d.unpickable);
    const wireframes = state.data.filter(d => !d.sphere && !d.scenegraph && d.wireframe);
    const models = state.data.filter(d => !!d.scenegraph);

    if (state.doCollisions) {
      doCollisions(state.data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url2gltf: { [url: string]: Promise<any> } = {};
    for (const m of models) {
      if (m.scenegraph && m.scenegraphNode && !Object.prototype.hasOwnProperty.call(url2gltf, m.scenegraph)) {
        url2gltf[m.scenegraph] = loadGLTF({ scenegraph: m.scenegraph } as SpatialSceneNode, BodyUILayer.gltfCache);
      }
    }

    return [
      meshLayer('spheres', spheres, { wireframe: false, pickable: false, mesh: new SphereGeometry() }),
      meshLayer('pickableSpheres', pickableSpheres, { wireframe: false, pickable: true, mesh: new SphereGeometry() }),
      meshLayer('cubes', cubes, { wireframe: false, pickable: false }),
      meshLayer('pickableCubes', pickableCubes, { wireframe: false, pickable: true }),
      meshLayer('wireframes', wireframes, { wireframe: true, pickable: false }),
      ...models.map((model) =>
        new ScenegraphLayer({
          id: 'models-' + model['@id'],
          opacity: model.zoomBasedOpacity ? state.zoomOpacity : (model.opacity !== undefined ? model.opacity : 1.0),
          pickable: !model.unpickable,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          data: [model],
          scenegraph: model.scenegraphNode ?
            loadGLTF2(model.scenegraphNode, url2gltf[model.scenegraph as string]) :
            model.scenegraph as unknown as URL,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _lighting: model._lighting, // 'pbr' | undefined
          getTransformMatrix: model.transformMatrix as unknown as number[][],
          getColor: model.color ?? [0, 255, 0, 0.5*255],
          parameters: { depthMask: !model.zoomBasedOpacity && (model.opacity === undefined || model.opacity === 1) }
        })
      )
    ].filter(l => !!l);
  }

  getPickingInfo(
    e: Parameters<CompositeLayer<SpatialSceneNode>['getPickingInfo']>[0]
  ): ReturnType<CompositeLayer<SpatialSceneNode>['getPickingInfo']> {
    return e.info;
  }
}
