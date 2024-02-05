/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Matrix4 } from '@math.gl/core';

export type SceneTraversalVisitor = (
  child,
  modelMatrix: Matrix4,
  parentMatrix: Matrix4
) => boolean;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function traverseScene(
  scene,
  worldMatrix: Matrix4,
  visitor: SceneTraversalVisitor
): boolean {
  if (!worldMatrix) {
    worldMatrix = new Matrix4(Matrix4.IDENTITY);
  }
  const matrix = new Matrix4(Matrix4.IDENTITY);
  if (!scene) {
    return true;
  } else if (scene.matrix) {
    matrix.copy(scene.matrix);
  } else {
    matrix.identity();

    if (scene.translation) {
      matrix.translate(scene.translation);
    }

    if (scene.rotation) {
      const rotationMatrix = new Matrix4(Matrix4.IDENTITY).fromQuaternion(
        scene.rotation
      );
      matrix.multiplyRight(rotationMatrix);
    }

    if (scene.scale) {
      matrix.scale(scene.scale);
    }
  }
  const modelMatrix = new Matrix4(worldMatrix).multiplyRight(matrix);
  if (visitor(scene, modelMatrix, worldMatrix) === false) {
    return false;
  }
  for (const child of scene.nodes || scene.children || []) {
    if (traverseScene(child, modelMatrix, visitor) === false) {
      return false;
    }
  }
  return true;
}
