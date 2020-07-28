import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild,
} from '@angular/core';
import { ChannelConfig, DataSource, ImageViewer, LoaderType, PictureInPictureViewer, TiffInfo } from 'ccf-image-viewer';
import { ResizeSensor } from 'css-element-queries';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';


const DEMO_SOURCE: DataSource = {
  type: LoaderType.Tiff,
  info: {
    url: 'https://vitessce-demo-data.storage.googleapis.com/test-data/hubmap/pyramid_0.0.2/spraggins.ome.tif'
  }
};

function hexToRgbTriple(hex: string): [number, number, number] {
  // tslint:disable: no-bitwise
  if (hex === undefined || hex.length !== 7) {
    return [255, 255, 255];
  }

  const value = Number.parseInt(hex.slice(1), 16) | 0;
  if (Number.isNaN(value)) {
    return [255, 255, 255];
  }

  const red = (value >> 16) & 0xff;
  const green = (value >> 8) & 0xff;
  const blue = value & 0xff;

  return [red, green, blue];
  // tslint:enable: no-bitwise
}

function brightnessToSlider(brightness: [number, number]): [number, number] {
  const SLIDER_MAX = 2 ** 16 - 1;
  return [
    Math.trunc(SLIDER_MAX * brightness[0] / 100),
    Math.trunc(SLIDER_MAX * brightness[1] / 100)
  ];
}

@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  // tslint:disable-next-line: no-unsafe-any
  @Input() set sources(urls: string[]) {
    this._sources = this.sourcesFromUrls(urls);
    this.isDemo = false;
    if (this._sources.length === 0) {
      this._sources = []; // Disabled showing demo image via [DEMO_SOURCE]
      this.isDemo = true;
    }

    this.updateSources();
  }
  get sources(): string[] {
    return this._sources.map(source => (source.info as TiffInfo).url);
  }
  private _sources: DataSource[] = []; // Disabled showing demo image via [DEMO_SOURCE]

  // tslint:disable-next-line: no-unsafe-any
  @Input() set layers(layers: ImageViewerLayer[]) {
    this._layers = layers;
    this.updateLayers();
  }
  get layers(): ImageViewerLayer[] { return this._layers; }
  private _layers: ImageViewerLayer[] = [];

  @Output() channelsChange = new EventEmitter<string[]>();

  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef<HTMLCanvasElement>;

  isDemo = true;
  private viewer: ImageViewer;
  private sensor: ResizeSensor;

  constructor(private readonly container: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const {
      container: { nativeElement: container },
      canvas: { nativeElement: element }
    } = this;
    const { clientWidth, clientHeight } = element;

    this.viewer = new PictureInPictureViewer({
      id: 'image-viewer',
      initialViewState: {
        zoom: -6,
        target: [25000, 10000, 0]
      },
      canvas: element,
      width: clientWidth,
      height: clientHeight,
      overview: {
        detailWidth: clientWidth,
        detailHeight: clientHeight
      },
      defaultChannelConfig: {
        active: false
      }
    });

    this.sensor = new ResizeSensor(container, ({ width, height }) => {
      this.viewer.setSize(width, height);
    });

    (async () => {
      await this.updateSources();
      await this.updateLayers();
    })();
  }

  ngOnDestroy(): void {
    this.sensor.detach();
    this.viewer.finalize();
  }

  private async updateSources(): Promise<void> {
    const { _sources: sources, viewer, channelsChange } = this;
    if (!viewer) {
      return;
    }

    await viewer.setSources(sources);
    channelsChange.emit(viewer.channelNames);
  }

  private async updateLayers(): Promise<void> {
    const { layers, viewer } = this;
    if (!viewer || layers.length === 0) {
      return;
    }

    const configs: Record<string, Partial<ChannelConfig>> = layers.reduce((result, layer) => ({
      ...result,
      [layer.id]: {
        active: layer.selected,
        color: hexToRgbTriple(layer.color),
        slider: brightnessToSlider(layer.brightness)
      }
    }), {});

    await viewer.updateChannelConfigs(configs);
  }

  private sourcesFromUrls(urls: string[]): DataSource[] {
    return urls.filter(url => !!url).map(url => ({
      type: LoaderType.Tiff,
      info: { url }
    }));
  }
}
