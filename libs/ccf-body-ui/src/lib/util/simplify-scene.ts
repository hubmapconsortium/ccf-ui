import { Matrix4 } from '@math.gl/core';
import { AABB, Vec3 } from 'cannon-es';

import { SpatialSceneNode } from '../shared/spatial-scene-node';
import { loadGLTF } from './load-gltf';
import { traverseScene } from './scene-traversal';

export async function simplifyScene(
  nodes: SpatialSceneNode[]
): Promise<SpatialSceneNode[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gltfCache: { [url: string]: any } = {};
  const gltfUrls = new Set(nodes.map((n) => n.scenegraph).filter((n) => !!n));
  for (const gltfUrl of gltfUrls) {
    // eslint-disable-next-line no-await-in-loop
    gltfCache[gltfUrl as string] = await loadGLTF({
      scenegraph: gltfUrl,
    } as SpatialSceneNode);
  }
  const newNodes: SpatialSceneNode[] = nodes.filter((n) => !n.scenegraph);

  for (const model of nodes.filter((n) => n.scenegraph)) {
    const gltf = gltfCache[model.scenegraph as string];
    const bbox = new AABB();
    let worldMatrix = new Matrix4(model.transformMatrix);

    /* eslint-disable  */
    if (model.scenegraphNode) {
      const scenegraphNode = model.scenegraphNode
        ? gltf.nodes.find((n) => n.name === model.scenegraphNode)
        : undefined;
      let foundNodeInScene = false;
      for (const scene of gltf.scenes) {
        if (!foundNodeInScene) {
          traverseScene(
            scene,
            new Matrix4(model.transformMatrix),
            (child, modelMatrix) => {
              if (child === scenegraphNode) {
                worldMatrix = modelMatrix;
                foundNodeInScene = true;
                return false;
              }
              return true;
            }
          );
        }
      }
      gltf.scene = {
        id: model.scenegraphNode,
        name: model.scenegraphNode,
        nodes: [scenegraphNode],
      };
    }

    traverseScene(gltf.scene, worldMatrix, (node, modelMatrix) => {
      if (
        node.mesh &&
        node.mesh.primitives &&
        node.mesh.primitives.length > 0
      ) {
        for (const primitive of node.mesh.primitives) {
          if (
            primitive.attributes.POSITION &&
            primitive.attributes.POSITION.min
          ) {
            const lowerBound = modelMatrix.transformAsPoint(
              primitive.attributes.POSITION.min,
              []
            );
            const upperBound = modelMatrix.transformAsPoint(
              primitive.attributes.POSITION.max,
              []
            );
            const innerBbox = new AABB({
              lowerBound: new Vec3(
                ...lowerBound.map((n, i) => Math.min(n, upperBound[i]))
              ),
              upperBound: new Vec3(
                ...upperBound.map((n, i) => Math.max(n, lowerBound[i]))
              ),
            });
            bbox.extend(innerBbox);
          }
        }
      }
      return true;
    });
    /* eslint-enable */

    const size = bbox.upperBound.clone().vsub(bbox.lowerBound);
    const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
    const position = bbox.lowerBound.clone().vadd(halfSize);
    const transformMatrix = new Matrix4(Matrix4.IDENTITY)
      .translate(position.toArray())
      .scale(halfSize.toArray());
    const newNode: SpatialSceneNode = {
      ...model,
      transformMatrix,
      geometry: 'wireframe',
    };
    delete newNode.scenegraph;
    delete newNode.scenegraphNode;

    newNodes.push(newNode);
  }
  return newNodes;
}
