/* eslint-disable @typescript-eslint/naming-convention */
import { load } from '@loaders.gl/core';
import { DracoLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { Matrix4 } from '@math.gl/core';
import { AABB, Vec3 } from 'cannon-es';

import { SpatialSceneNode } from '../shared/spatial-scene-node';
import { traverseScene } from './scene-traversal';

interface Collision {
  '@id': string;
  name: string;
  hits: { '@id': string; name: string }[];
}

/* eslint-disable  */
export async function doCollisions(
  scene: SpatialSceneNode[]
): Promise<Collision[]> {
  console.log('Starting Collisioning');
  const sourceBoxes = scene
    .filter((d) => !d.scenegraph && d.geometry !== 'wireframe')
    .map((model) => {
      const mat = new Matrix4(model.transformMatrix);
      const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
      const upperBound = mat.transformAsPoint([1, 1, 1], []);
      return {
        '@id': model['@id'],
        name: model.tooltip,
        entityId: model.entityId,
        bbox: new AABB({
          lowerBound: new Vec3(
            ...lowerBound.map((n, i) => Math.min(n, upperBound[i]))
          ),
          upperBound: new Vec3(
            ...upperBound.map((n, i) => Math.max(n, lowerBound[i]))
          ),
        }),
      };
    });

  const targetBoxes: {
    '@id': string;
    name: string;
    entityId?: string;
    bbox: AABB;
    gltf: unknown;
  }[] = [];
  for (const model of scene.filter((d) => !!d.scenegraph)) {
    const gltf = await load(model.scenegraph as string, GLTFLoader, {
      DracoLoader,
      decompress: true,
      postProcess: true,
    });
    for (const gltfScene of gltf.scenes) {
      traverseScene(
        gltfScene,
        new Matrix4(model.transformMatrix),
        (node, modelMatrix) => {
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
                targetBoxes.push({
                  '@id': model['@id'],
                  name: node.name,
                  entityId: model.entityId,
                  bbox: new AABB({
                    lowerBound: new Vec3(
                      ...lowerBound.map((n, i) => Math.min(n, upperBound[i]))
                    ),
                    upperBound: new Vec3(
                      ...upperBound.map((n, i) => Math.max(n, lowerBound[i]))
                    ),
                  }),
                  gltf,
                });
              }
            }
          }
          return true;
        }
      );
    }
  }

  const report: Collision[] = [];
  const sad: unknown[] = [];
  for (const src of sourceBoxes) {
    const hits: { '@id': string; name: string }[] = [];
    for (const target of targetBoxes) {
      if (src.bbox.overlaps(target.bbox)) {
        hits.push({ '@id': target['@id'], name: target.name });
      }
    }
    if (hits.length > 0) {
      report.push({
        '@id': src.entityId as string,
        name: src.name as string,
        hits,
      });
    } else {
      sad.push(src);
    }
  }

  console.log({
    sourceBoxes,
    targetBoxes,
    report,
    sad,
    maxHits: Math.max(...report.map((r) => r.hits.length)),
  });

  const csvReport: unknown[] = [];
  for (const hit of report) {
    csvReport.push({
      'Tissue ID': hit['@id'],
      'Tissue Name': hit.name,
      'Hit ID': '',
      'Hit Name': '',
    });
    for (const h of hit.hits) {
      csvReport.push({
        'Tissue ID': hit['@id'],
        'Tissue Name': hit.name,
        'Hit ID': h['@id'],
        'Hit Name': h.name,
      });
    }
  }
  console.log(csvReport);

  return report;
}
/* eslint-enable */
