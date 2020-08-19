import { Deck, Layer, View, Viewport } from '@deck.gl/core';
import { Loader, VivView } from '@hms-dbmi/viv';
import { bind } from 'bind-decorator';

import { createLoader, LoaderType, OMEZarrInfo, TiffInfo, ZarrInfo } from './loader';
import { flatMap, getVivId } from './utils';


type ValueOrGenerator<T, U extends unknown[] = []> = T | ((...args: U) => T);

type DeckProps = ConstructorParameters<typeof Deck>[0];
interface ExtDeckProps extends DeckProps {
  canvas?: string | HTMLElement;
}

type DeckCallbackArgs<K extends keyof DeckProps> = Parameters<NonNullable<DeckProps[K]>>[0];
type LayerFilterArgs = DeckCallbackArgs<'layerFilter'>;
type OnViewStateChangeArgs = DeckCallbackArgs<'onViewStateChange'> & { viewId: string };

export type State = Record<string, unknown>;
export type LayerConfig = Record<string, unknown>;

export interface ChannelConfig {
  active: boolean;
  color: [number, number, number];
  slider: [number, number];
}

export interface DataSource {
  type: LoaderType;
  info: ZarrInfo | OMEZarrInfo | TiffInfo;
}

export interface ImageViewerProps {
  id: string;
  initialViewState: State;
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
  sources?: DataSource[];
  channelNames?: string[];
  defaultChannelConfig?: Partial<ChannelConfig>;
}

function applyPropDefaults<Props extends ImageViewerProps>(props: Props): Props & Required<ImageViewerProps> {
  return {
    canvas: null,
    width: 0,
    height: 0,
    sources: [],
    channelNames: [],
    ...props,
    defaultChannelConfig: {
      active: true,
      color: [255, 255, 255],
      slider: [1500, 20000],
      ...(props.defaultChannelConfig ?? {})
    }
  };
}


export abstract class ImageViewer<Props extends ImageViewerProps = ImageViewerProps> {
  readonly props: Props & Required<ImageViewerProps>;

  get width(): number { return this._width; }
  get height(): number { return this._height; }
  private _width: number;
  private _height: number;

  get sources(): DataSource[] { return this._sources; }
  get loaders(): Loader[] { return this._loaders; }
  private _sources: DataSource[] = [];
  private _loaders: Loader[] = [];

  get channelNames(): string[] { return Object.keys(this.channelConfigs); }
  get channelConfigs(): Record<string, ChannelConfig> { return this._channelConfigs; }
  private _channelConfigs: Record<string, ChannelConfig> = {};

  protected vivViews: VivView[] = [];
  protected views: View[] = [];
  protected layers: Layer<unknown>[] = [];
  protected layerConfigs: LayerConfig[] = [];
  protected states: Record<string, State> = {};

  private deck: Deck;

  constructor(props: Props) {
    const reqProps = this.props = applyPropDefaults(props);
    this.deck = this.initializeDeck(reqProps);
    this._width = reqProps.width;
    this._height = reqProps.height;

    if (reqProps.sources.length > 0) {
      this.setSources(reqProps.sources);
    }
  }

  clear(): void {
    this._sources = [];
    this._loaders = [];
    this._channelConfigs = {};
    this.vivViews = [];
    this.layers = [];
    this.layerConfigs = [];
    this.states = {};
    this.update();
  }

  finalize(): void {
    this.deck.finalize();
  }

  async setSize(width: number, height: number): Promise<this> {
    this._width = width;
    this._height = height;
    this.vivViews = await this.createVivViews();

    this.updateState((view, current) => ({
      viewState: {
        ...current,
        width,
        height,
        id: view.id
      }
    }));
    this.update();
    this.deck.redraw(true);

    return this;
  }

  async setSources(sources: DataSource[]): Promise<this> {
    const loaderPromises = sources.map(source => createLoader(source.type, source.info));
    const loaders = await Promise.all(loaderPromises);

    this._sources = sources;
    this._loaders = loaders;
    this.resetChannelConfigs();
    this.vivViews = await this.createVivViews();
    this.layerConfigs = await this.createLayerConfigs();
    this.updateState(view => ({ viewState: view.initialViewState }));
    this.update();

    return this;
  }

  async updateChannelConfigs(configs: Record<string, Partial<ChannelConfig>>): Promise<this> {
    const newConfigs = Object.entries(configs).reduce((result, [key, config]) => {
      return !(key in result) ? result : {
        ...result,
        [key]: {
          ...result[key],
          ...config
        }
      };
    }, this.channelConfigs);

    if (newConfigs === this.channelConfigs) { return this; }

    this._channelConfigs = newConfigs;
    this.layerConfigs = await this.createLayerConfigs();
    this.update();

    return this;
  }

  protected abstract async createVivViews(): Promise<VivView[]>;
  protected abstract async createLayerConfigs(): Promise<LayerConfig[]>;

  protected update(): void {
    this.updateViews();
    this.updateLayers();
    this.updateDeckProps({
      views: this.views,
      layers: this.layers,
      viewState: this.states
    });
  }

  protected updateViews(): void {
    this.views = this.vivViews.map(viv => viv.getDeckGlView());
  }

  protected updateLayers(): void {
    const { vivViews, states, layerConfigs } = this;
    const length = layerConfigs.length;

    this.layers = flatMap(vivViews, (view, index) => view.getLayers({
      viewStates: states,
      props: layerConfigs[index % length]
    }));
  }

  protected updateState(
    args: ValueOrGenerator<Record<string, unknown>, [VivView, State]>
  ): void {
    const argsGenerator = typeof args === 'function' ? args : () => args;
    const currentStates = this.states;

    this.states = this.vivViews.reduce((states, view) => {
      const current = currentStates[view.id] ?? {};
      states[view.id] = view.filterViewState(argsGenerator(view, current));
      return states;
    }, {} as Record<string, State>);
  }

  protected updateDeckProps(props: Partial<DeckProps>): void {
    this.deck.setProps(props);
  }

  private initializeDeck(props: Props & Required<ImageViewerProps>): Deck {
    const { id, canvas, width, height } = props;
    return new Deck({
      id,
      canvas,
      width,
      height,
      views: [],
      layers: [],
      effects: [],
      viewState: {},
      layerFilter: this.layerFilter,
      onViewStateChange: this.onViewStateChange,
      glOptions: {
        webgl2: true
      }
    } as ExtDeckProps);
  }

  private resetChannelConfigs(): void {
    const { loaders, props: { channelNames, defaultChannelConfig } } = this;
    const keys = channelNames.length > 0 ?
      channelNames :
      flatMap<Loader, string>(loaders, loader => loader.channelNames ?? []);

    this._channelConfigs = keys.reduce((configs, key) => ({
      ...configs,
      [key]: defaultChannelConfig as ChannelConfig
    }), {} as Record<string, ChannelConfig>);
  }

  @bind
  private layerFilter({ layer, viewport }: LayerFilterArgs): boolean {
    const { id: viewportId } = viewport as Viewport & { id: string };
    return layer.id.includes(getVivId(viewportId));
  }

  @bind
  private onViewStateChange({ viewId, viewState, oldViewState }: OnViewStateChangeArgs): void {
    this.updateState((_view, current) => ({
      viewState: { ...viewState, id: viewId },
      oldViewState,
      currentViewState: current
    }));
    this.update();
  }
}
