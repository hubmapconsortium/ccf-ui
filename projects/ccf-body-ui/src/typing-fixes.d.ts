/*
 * Typings hacks for missing typings from @danmarshall/deckgl-typings
 */
/// <reference types="node" />
declare type ScenegraphNode = any;
declare module '@luma.gl/gltools';
declare module '@luma.gl/engine';
declare module '@luma.gl/experimental';
declare module '@loaders.gl/core';
declare module '@loaders.gl/gltf';
declare module '@math.gl/core';

// npm install --save-dev @danmarshall/deckgl-typings
// cp -r node_modules/@danmarshall/deckgl-typings/math.gl__core node_modules/@types/

declare module 'quaternion';
declare module 'quaternion-to-euler';
