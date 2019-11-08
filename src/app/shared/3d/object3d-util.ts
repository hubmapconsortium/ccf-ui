import { Box3, Material, Object3D, Vector3 } from 'three';

/**
 * Calculates the bounding box of a 3D object.
 *
 * @param obj The 3D object.
 * @returns The bounding box.
 */
export function getBBox(obj: Object3D): Box3 {
  return new Box3().setFromObject(obj);
}

/**
 * Centers a 3D object.
 *
 * @param obj The object to center.
 * @param [alignZ] Whether to align the bottom or the middle of the bounding box on the z axis.
 */
export function centerObject(obj: Object3D, alignZ = true): void {
  const bbox = getBBox(obj);
  const { x, y, z } = bbox.getCenter(new Vector3());
  obj.position.set(-x, -y, alignZ ? -bbox.min.z : -z);
}

/**
 * Scales a 3D object such that it fits into a box with sides `size` long.
 *
 * @param obj The object to scale.
 * @param size The size of the bounding box sides.
 */
export function setObjectSize(obj: Object3D, size: number): void {
  const bbox = getBBox(obj);
  const { x, y, z } = bbox.getSize(new Vector3());
  const max = Math.max(x, y, z);
  obj.scale.setScalar(size / max);
}

/**
 * Rotates a 3D object.
 *
 * @param obj The object to rotate.
 * @param [angleX] The x axis rotation.
 * @param [angleY] The y axis rotation.
 * @param [angleZ] The z axis rotation.
 */
export function setObjectRotation(obj: Object3D, angleX?: number, angleY?: number, angleZ?: number): void {
  const { rotation } = obj;
  if (angleX !== undefined) {
    rotation.x = angleX;
  }
  if (angleY !== undefined) {
    rotation.y = angleY;
  }
  if (angleZ !== undefined) {
    rotation.z = angleZ;
  }
}

/**
 * Sets the opacity of a 3D object.
 *
 * @param obj The object to change.
 * @param opacity The opacity value.
 * @param [transparent] Whether it should be transparent.
 * @param [recursive] Whether it should set the opacity for all child objects.
 */
export function setObjectOpacity(
  obj: Object3D, opacity: number, transparent = false,
  recursive: boolean | number = true
): void {
  if (recursive === true || recursive > 0) {
    const nextRecursive = typeof recursive === 'number' ? recursive - 1 : recursive;
    obj.children.forEach(child => setObjectOpacity(child, opacity, transparent, nextRecursive));
  }
  if ('material' in obj) {
    const material = obj['material'] as Material;
    material.opacity = opacity;
    material.transparent = transparent;
  }
}
