import { Deck } from '@deck.gl/core';
import { createOMETiffLoader, DetailView, OverviewView } from '@hubmap/vitessce-image-viewer';

export interface LayerSpec {
  url: string;
  offsets?: number[];
}

export interface Channel {
  name: string;
  color: [number, number, number];
}

export interface ImageViewerProps {
  id: string;
  canvas: string | HTMLCanvasElement;
  width: number;
  height: number;
  layers: LayerSpec[];
}

export class ImageViewer {
  private loaders: Promise<unknown[]>;
  private views: any[] = [];
  private states: {[id: string]: unknown} = {};
  private deck?: Deck;

  constructor(private props: ImageViewerProps) {
    this.loaders = this.createLoaders(props.layers);
    this.loaders.then(loaders => {
      this.views = this.createViews(loaders);
      this.states = this.createState(view => ({ viewState: view.initialViewState }));
      this.deck = this.createDeck(loaders);
    });

    console.log(this);
  }

  async getMetadata(): Promise<unknown> {
    const loaders = await this.loaders;
    const channels = loaders.reduce((names: string[], loader) => {
      return names.concat((loader as any).channelNames);
    }, []);

    return {
      channels
    };
  }

  destroy(): void {
    this.deck?.finalize();
    this.loaders = Promise.resolve([]);
    this.views = [];
    this.states = {};
    this.deck = undefined;
  }

  private createLoaders(layers: LayerSpec[]): Promise<unknown[]> {
    const loaders = layers.map(createOMETiffLoader);
    return Promise.all(loaders);
  }

  private createViews(loaders: unknown[]): unknown[] {
    const initialViewState = {
      target: [25000, 10000, 0],
      zoom: -6,
      width: this.props.width,
      height: this.props.height
    };

    const detailView = new DetailView({
      initialViewState: {
        ...initialViewState,
        id: 'detail'
      }
    });

    const overviewView = new OverviewView({
      initialViewState: {
        ...initialViewState,
        id: 'overview'
      },
      loader: loaders[0], // FIXME
      detailWidth: initialViewState.width,
      detailHeight: initialViewState.height,
      margin: 25,
      scale: 0.15,
      position: 'bottom-left'
    });

    return [detailView, overviewView];
  }

  private createState(argGen: (view: any) => any): {[id: string]: unknown} {
    return this.views.reduce((state, view) => {
      state[view.id] = view.filterViewState(argGen(view));
      return state;
    }, {});
  }

  private createLayers(layerProps: any[]): unknown[] {
    return this.views.map((view, i) => view.getLayers({
      viewStates: this.states,
      props: {
        ...layerProps[i]
      }
    }));
  }

  private createDeck(loaders: unknown[]): Deck {
    const loader: any = loaders[0]; // FIX
    const channelCount = loader.channelNames.length;
    const layerConfig = {
      loader,
      sliderValues: Array(channelCount).fill([1500, 20000]),
      colorValues: Array(channelCount).fill([255, 255, 255]),
      channelIsOn: Array(channelCount).fill(true),
      loaderSelection: loader.channelNames.map(name => ({ channel: name })),
    };

    return new Deck({
      id: this.props.id,
      canvas: this.props.canvas,
      layers: this.createLayers(Array(this.views.length).fill(layerConfig)),
      views: this.views.map(view => view.getDeckGlView()),
      viewState: this.states,
      onViewStateChange: this.onViewStateChange.bind(this),
      glOptions: {
        webgl2: true
      }
    } as any);
  }

  private onViewStateChange({ viewId, viewState, oldViewState }): void {
    this.states = this.createState(view => ({
      viewState: { ...viewState, id: viewId },
      oldViewState,
      currentViewState: this.states[view.id]
    }));
  }
}
