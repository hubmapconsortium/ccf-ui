import { DetailView, OverviewView, OverviewViewNewArgs, VivView } from '@hubmap/vitessce-image-viewer';

import { ImageViewer, ImageViewerProps, LayerConfig } from './image-viewer';

export type OverviewArgs = Omit<OverviewViewNewArgs, 'initialViewState' | 'loader'>
export interface PictureInPictureViewerProps extends ImageViewerProps {
  overview: OverviewArgs;
}

const OVERVIEW_DEFAULTS: Partial<OverviewArgs> = {
  margin: 25,
  scale: 0.15,
  position: 'bottom-left'
};

export class PictureInPictureViewer extends ImageViewer<PictureInPictureViewerProps> {
  constructor(props: PictureInPictureViewerProps) {
    super({
      ...props,
      overview: { ...OVERVIEW_DEFAULTS, ...props.overview }
    });
  }

  protected async createVivViews(): Promise<VivView[]> {
    if (this.loaders.length === 0) { return []; }

    const { width = 0, height = 0 } = this.props;

    const detailView = new DetailView({
      initialViewState: {
        ...this.props.initialViewState,
        id: 'detail',
        width,
        height
      }
    });

    const overviewView = new OverviewView({
      initialViewState: {
        ...this.props.initialViewState,
        id: 'overview',
        width,
        height
      },
      loader: this.loaders[0],
      ...this.props.overview
    });

    return [detailView, overviewView];
  }

  protected async createLayerConfigs(): Promise<LayerConfig[]> {
    const { loaders, channels } = this;
    if (loaders.length === 0) { return []; }

    const channelIsOn = channels.map(channel => channel.active);
    const colorValues = channels.map(channel => channel.color);
    const sliderValues = channels.map(channel => channel.slider);
    const loaderSelection = channels.map(channel => ({ channel: channel.name }));

    return [
      {
        loader: this.loaders[0],
        channelIsOn,
        colorValues,
        sliderValues,
        loaderSelection
      }
    ];
  }
}
