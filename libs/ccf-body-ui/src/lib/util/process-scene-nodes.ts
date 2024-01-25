import { Matrix4 } from '@math.gl/core';
import { AABB, Vec3 } from 'cannon-es';

import { SpatialSceneNode } from '../shared/spatial-scene-node';
import { loadGLTF, registerGLTFLoaders } from './load-gltf';
import { traverseScene } from './scene-traversal';

export interface ProcessedNode extends SpatialSceneNode {
  bbox: AABB;
  jsonld: unknown;
  node: unknown;
  size: Vec3;
  center: Vec3;
}

/* eslint-disable  */
function childNames(scene, names: string[] = []): string[] {
  for (const child of scene.nodes || scene.children || []) {
    names.push(child.name);
    childNames(child, names);
  }
  return names;
}

export async function processSceneNodes(
  gltfUrl: string,
  worldMatrix?: Matrix4,
  scenegraphNode?: string,
  gltfCache?: { [url: string]: Promise<Blob> }
): Promise<{ [node: string]: ProcessedNode }> {
  registerGLTFLoaders();
  const gltf = await loadGLTF(
    { scenegraph: gltfUrl, scenegraphNode } as SpatialSceneNode,
    gltfCache
  );
  const nodes: { [node: string]: ProcessedNode } = {};
  const gltfNodes: ProcessedNode[] = [];
  for (const scene of gltf.scenes) {
    worldMatrix = new Matrix4(worldMatrix || Matrix4.IDENTITY);
    traverseScene(scene, worldMatrix, (node, modelMatrix: Matrix4) => {
      const processedNode: ProcessedNode = {
        '@id': (node.name || node.id) as string,
        '@type': 'ProcessedNode',
        transformMatrix: new Matrix4(modelMatrix),
        geometry: 'wireframe',
        node,
      } as ProcessedNode;
      gltfNodes.push({
        '@id': `GLTF:${processedNode['@id']}`,
        '@type': 'GLTFNode',
        scenegraph: gltfUrl,
        scenegraphNode: processedNode['@id'],
        transformMatrix: new Matrix4(worldMatrix || Matrix4.IDENTITY),
        tooltip: (node.name || node.id) as string,
        color: [255, 255, 255, 255],
        _lighting: 'pbr',
        zoomBasedOpacity: true,
        node,
      } as ProcessedNode);
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
            processedNode.bbox = new AABB({
              lowerBound: new Vec3(
                ...lowerBound.map((n, i) => Math.min(n, upperBound[i]))
              ),
              upperBound: new Vec3(
                ...upperBound.map((n, i) => Math.max(n, lowerBound[i]))
              ),
            });
          }
        }
      }
      nodes[processedNode['@id']] = processedNode;
      return true;
    });
  }

  for (const node of Object.values(nodes).filter((n) => !n.bbox)) {
    for (const child of childNames(node.node)
      .map((n) => nodes[n])
      .filter((n) => n.bbox)) {
      if (!node.bbox) {
        node.bbox = child.bbox.clone();
      } else {
        node.bbox.extend(child.bbox);
      }
    }
    if (!node.bbox) {
      delete nodes[node['@id']];
    }
  }
  for (const node of Object.values(nodes)) {
    const lb = node.bbox.lowerBound;
    const ub = node.bbox.upperBound;
    const size = (node.size = ub.clone().vsub(lb));
    const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
    const center = (node.center = lb.clone().vadd(halfSize));

    node.transformMatrix = new Matrix4(Matrix4.IDENTITY)
      .translate(center.toArray())
      .scale(halfSize.toArray());
  }
  for (const node of gltfNodes) {
    nodes[node['@id']] = node;
  }
  return nodes;
}
/* eslint-enable */
