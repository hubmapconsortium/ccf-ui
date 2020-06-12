import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild,
} from '@angular/core';
import { ChannelConfig, DataSource, ImageViewer, LoaderType, PictureInPictureViewer } from 'ccf-image-viewer';
import { ResizeSensor } from 'css-element-queries';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';


function hexToRgbTriple(hex: string): [number, number, number] {
  // tslint:disable: no-bitwise
  if (hex === undefined || hex.length !== 7) { return [255, 255, 255]; }

  const value = Number.parseInt(hex.slice(1), 16) | 0;
  if (Number.isNaN(value)) { return [255, 255, 255]; }

  const red = (value >> 16) & 0xff;
  const green = (value >> 8) & 0xff;
  const blue = value & 0xff;

  return [red, green, blue];
  // tslint:enable: no-bitwise
}


@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  // tslint:disable-next-line: no-unsafe-any
  @Input() set sources(sources: DataSource[]) {
    this._sources = sources;
    this.updateSources();
  }
  private _sources: DataSource[] = [
    {
      type: LoaderType.Tiff,
      info: {
        url: 'https://vitessce-demo-data.storage.googleapis.com/test-data/hubmap/pyramid_0.0.2/spraggins.ome.tif'
      }
    }
  ];

  // tslint:disable-next-line: no-unsafe-any
  @Input() set layers(layers: ImageViewerLayer[]) {
    this._layers = layers;
    this.updateLayers();
  }
  private _layers: ImageViewerLayer[] = [];

  @Output() channelsChange = new EventEmitter<string[]>();

  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef<HTMLCanvasElement>;

  private viewer: ImageViewer;
  private sensor: ResizeSensor;

  constructor(private readonly container: ElementRef<HTMLElement>) {}

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
      // defaultChannelConfig: {
      //   active: false
      // }
    });

    this.sensor = new ResizeSensor(container, ({ width, height }) => {
      this.viewer.setSize(width, height);
    });

    this.updateSources().then(() => this.updateLayers());

    /*************************************************************
     * REMOVE ME!
     */
    console.log(this.viewer);
  }

  ngOnDestroy(): void {
    this.sensor.detach();
    this.viewer.finalize();
  }

  private async updateSources(): Promise<void> {
    const { _sources: sources, viewer, channelsChange } = this;
    if (!viewer) { return; }

    await viewer.setSources(sources);
    channelsChange.emit(viewer.channelNames);
  }

  private async updateLayers(): Promise<void> {
    const { _layers: layers, viewer } = this;
    if (!viewer) { return; }

    const configs: Record<string, Partial<ChannelConfig>> = layers.reduce((result, layer) => ({
      ...result,
      [layer.id]: {
        active: layer.selected,
        color: hexToRgbTriple(layer.color)
      }
    }), {});

    await viewer.updateChannelConfigs(configs);
  }
}
