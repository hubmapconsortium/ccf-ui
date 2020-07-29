/*
 * This file contains minimal (incomplete) typings for vitessce-image-viewer.
 */

declare module "@hubmap/vitessce-image-viewer" {
  import { Layer, View } from '@deck.gl/core';

  // Loaders
  export interface Loader {
    readonly type: string;
    readonly dtype: string;
    readonly isPyramid: boolean;
    readonly isRgb: boolean;
    readonly numLevels: number;
    readonly tileSize: number;
    readonly channelNames?: string[];

    getTile(tile: unknown): Promise<unknown>;
    getRaster(tile: unknown): Promise<unknown>;
    getRasterSize(tile: unknown): unknown;

    onTileError(error: Error): void;
  }

  export class OMEZarrReader {
    static fromUrl(url: string): Promise<OMEZarrReader>;

    constructor(zarrPath: string, rootAttrs: object);

    loadOMEZarr(): Promise<{ loader: Loader, metadata: unknown }>;
  }

  export function createOMETiffLoader(args: {
    url: string,
    offsets?: number[],
    headers?: object
  }): Promise<Loader>;

  export function createZarrLoader(args: {
    url: string,
    dimensions: unknown[],
    isPyramid: boolean,
    isRgb: boolean,
    scale: unknown,
    translate: unknown
  }): Promise<Loader>;


  // VivViews
  export interface ViewState {
    id: string;
    width: number;
    height: number;
  }

  export interface VivViewNewArgs {
    initialViewState: ViewState;
    x?: number;
    y?: number;
  }

  export interface OverviewViewNewArgs {
    initialViewState: ViewState;
    loader: Loader;
    detailWidth: number;
    detailHeight: number;
    scale?: number;
    margin?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    minimunWidth?: number;
    maximumWidth?: number;
  }

  export class VivView {
    readonly id: string;
    readonly initialViewState: ViewState;

    constructor(args: VivViewNewArgs);

    filterViewState(args: object): Record<string, unknown>;

    getDeckGlView(): View;
    getLayers(args: object): Layer<unknown>[];
  }

  export class DetailView extends VivView {}
  export class OverviewView extends VivView {
    constructor(args: OverviewViewNewArgs);
  }
}
