import { parse, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { Matrix4 } from '@math.gl/core';

import { traverseScene } from './scene-traversal';
import { SpatialSceneNode } from '../shared/spatial-scene-node';


export function registerGLTFLoaders(): void {
  // tslint:disable-next-line: no-unsafe-any
  registerLoaders([DracoWorkerLoader, GLTFLoader]);
}

// tslint:disable: no-unsafe-any
// tslint:disable-next-line: no-any
export async function loadGLTF(model: SpatialSceneNode, cache?: { [url: string]: Promise<Blob> }): Promise<any> {
  const gltfUrl = model.scenegraph as string;
  let gltfPromise: Promise<Blob|Response>;
  if (cache) {
    gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then(r => r.blob()));
  } else {
    gltfPromise = fetch(gltfUrl);
  }
  const gltf = await parse(gltfPromise, GLTFLoader, {DracoLoader, decompress: true, postProcess: true});

  const scenegraphNode = model.scenegraphNode ? gltf.nodes.find((n) => n.name === model.scenegraphNode) : undefined;
  if (scenegraphNode) {
    let foundNodeInScene = false;
    for (const scene of gltf.scenes) {
      if (!foundNodeInScene) {
        traverseScene(scene, new Matrix4(Matrix4.IDENTITY), (child, modelMatrix) => {
          if (child === scenegraphNode) {
            child.matrix = modelMatrix;
            child.translation = undefined;
            child.rotation = undefined;
            child.scale = undefined;
            foundNodeInScene = true;
            return false;
          }
          return true;
        });
      }
    }
    gltf.scene = {
      id: model.scenegraphNode,
      name: model.scenegraphNode,
      nodes: [scenegraphNode]
    };
    gltf.scenes = [gltf.scene];
  }
  return gltf;
}
// tslint:enable: no-unsafe-any
