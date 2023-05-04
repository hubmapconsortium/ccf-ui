import { Matrix4 } from '@math.gl/core';
export declare type SceneTraversalVisitor = (child: any, modelMatrix: Matrix4, parentMatrix: Matrix4) => boolean;
export declare function traverseScene(scene: any, worldMatrix: Matrix4, visitor: SceneTraversalVisitor): boolean;
