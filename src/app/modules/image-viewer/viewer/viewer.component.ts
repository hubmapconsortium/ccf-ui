import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output,
  SimpleChanges, ViewChild,
} from '@angular/core';
import { ImageViewer, LayerSpec } from 'ccf-image-viewer';

export { LayerSpec };

@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() layers: LayerSpec[] = [
    {url: 'https://vitessce-demo-data.storage.googleapis.com/test-data/hubmap/pyramid_0.0.2/spraggins.ome.tif'}
  ];

  @Output() metadataChange = new EventEmitter<{ channels: string[] }>();

  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef<HTMLCanvasElement>;

  private viewer: ImageViewer;

  constructor() { }

  ngAfterViewInit(): void {
    this.create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('layers' in changes && this.canvas) {
      this.viewer?.destroy();
      this.create();
    }
  }

  ngOnDestroy(): void {
    this?.viewer.destroy();
  }

  private create(): void {
    const { clientWidth, clientHeight } = this.canvas.nativeElement;

    this.viewer = new ImageViewer({
      id: 'image-viewer',
      canvas: this.canvas.nativeElement,
      width: clientWidth,
      height: clientHeight,
      layers: this.layers
    });

    this.viewer.getMetadata().then(meta => this.metadataChange.emit(meta as any));
  }
}
