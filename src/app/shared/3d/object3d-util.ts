import { Box3, Material, Object3D, Vector3 } from 'three';

export function getBBox(obj: Object3D): Box3 {
  return new Box3().setFromObject(obj);
}

export function centerObject(obj: Object3D, alignZ = true): void {
  const bbox = getBBox(obj);
  const { x, y, z } = bbox.getCenter(new Vector3());
  obj.position.set(-x, -y, alignZ ? -bbox.min.z : -z);
}

export function setObjectSize(obj: Object3D, size: number): void {
  const bbox = getBBox(obj);
  const { x, y, z } = bbox.getSize(new Vector3());
  const max = Math.max(x, y, z);
  obj.scale.setScalar(size / max);
}

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
