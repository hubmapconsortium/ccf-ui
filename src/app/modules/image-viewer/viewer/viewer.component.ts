import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild,
} from '@angular/core';
import { DataSource, ImageViewer, LoaderType, PictureInPictureViewer } from 'ccf-image-viewer';
import { ResizeSensor } from 'css-element-queries';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';


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

  constructor(private container: ElementRef<HTMLElement>) {}

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

    console.log(this.viewer);
  }

  ngOnDestroy(): void {
    this.viewer.finalize();
    this.sensor.detach();
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
    //
  }
}
