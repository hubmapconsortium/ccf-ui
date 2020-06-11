import { Deck, Layer, View, Viewport } from '@deck.gl/core';
import { Loader, VivView } from '@hubmap/vitessce-image-viewer';
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
export type StateCollection = Record<string, State>;
export type LayerConfig = Record<string, unknown>;

export interface ChannelConfig {
  name: string;
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
}

export interface Metadata {
  channels: string[];
}

export abstract class ImageViewer<Props extends ImageViewerProps = ImageViewerProps> {
  props: Props;
  protected sources: DataSource[] = [];
  protected loaders: Loader[] = [];
  protected vivViews: VivView[] = [];
  protected views: View[] = [];
  protected layerConfigs: LayerConfig[] = [];
  protected layers: Layer<unknown>[] = [];
  protected channels: ChannelConfig[] = [];
  protected states: StateCollection = {};
  protected deck: Deck;

  constructor(props: Props) {
    this.props = { ...props };
    this.deck = new Deck({
      id: props.id,
      canvas: props.canvas,
      width: props.width ?? 0,
      height: props.height ?? 0,
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

    if (props.sources) {
      this.setSources(props.sources);
    }
  }

  finalize(): void {
    this.deck.finalize();
  }

  async setSize(width: number, height: number): Promise<this> {
    this.props = { ...this.props, width, height };
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

    this.sources = sources;
    this.loaders = loaders;
    this.resetChannels();
    this.vivViews = await this.createVivViews();
    this.layerConfigs = await this.createLayerConfigs();
    this.updateState(view => ({ viewState: view.initialViewState }));
    this.update();

    return this;
  }

  async setChannel(name: string, config: Partial<Omit<ChannelConfig, 'name'>>): Promise<this> {
    const index = this.channels.findIndex(state => state.name === name);
    const clone = [...this.channels];

    clone[index] = { ...clone[index], ...config };
    this.channels = clone;
    this.layerConfigs = await this.createLayerConfigs();
    this.update();

    return this;
  }

  async getMetadata(): Promise<Metadata> {
    const channels: string[] = flatMap(this.loaders, loader => loader.channelNames ?? []);
    return { channels };
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
    }, {} as StateCollection);
  }

  protected updateDeckProps(props: Partial<DeckProps>): void {
    this.deck.setProps(props);
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

  private resetChannels(): void {
    const names: string[] = flatMap(this.loaders, loader => loader.channelNames ?? []);
    this.channels = names.map(name => ({
      name,
      active: true,
      color: [255, 255, 255],
      slider: [1500, 20000]
    }));
  }
}
