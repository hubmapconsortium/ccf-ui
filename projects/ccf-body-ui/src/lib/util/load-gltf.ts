/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { parse, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { Matrix4 } from '@math.gl/core';

import { SpatialSceneNode } from '../shared/spatial-scene-node';
import { traverseScene } from './scene-traversal';


export function registerGLTFLoaders(): void {
  registerLoaders([DracoWorkerLoader, GLTFLoader]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function deriveScenegraph(scenegraphNodeName: string, gltf: any): any {
  const scenegraphNode = gltf.nodes.find((n) => n.name === scenegraphNodeName);
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
      id: scenegraphNodeName,
      name: scenegraphNodeName,
      nodes: [scenegraphNode]
    };
    gltf.scenes = [gltf.scene];

    return { scene: gltf.scene, scenes: gltf.scenes };
  } else {
    return gltf;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadGLTF(model: SpatialSceneNode, cache?: { [url: string]: Promise<Blob> }): Promise<any> {
  const gltfUrl = model.scenegraph as string;
  let gltfPromise: Promise<Blob | Response>;
  if (cache) {
    gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then(r => r.blob()));
  } else {
    gltfPromise = fetch(gltfUrl);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const gltf = await parse(gltfPromise, GLTFLoader, { DracoLoader, gltf: { decompressMeshes: true, postProcess: true } });

  return deriveScenegraph(model.scenegraphNode as string, gltf);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadGLTF2(scenegraphNodeName: string, gltfPromise: Promise<any>): Promise<any> {
  return deriveScenegraph(scenegraphNodeName, await gltfPromise);
}
/* eslint-enable */
