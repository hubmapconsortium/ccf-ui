import { Component, Input } from '@angular/core';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';

@Component({
  selector: 'ccf-color-picker-launcher',
  templateUrl: './color-picker-launcher.component.html',
  styleUrls: ['./color-picker-launcher.component.scss']
})
export class ColorPickerLauncherComponent {
  @Input() layer:ImageViewerLayer;

  getBackground(): string {
    if (this.layer.colorScheme.type === 'discrete') { return this.layer.color; }

    const colors = this.layer.colorScheme.colors;
    const positions = this.layer.colorScheme.positions;

    let gradient = 'linear-gradient(to right, ';
    colors.forEach((color, index) => {
      gradient += color + ' ' + positions[index] * 100 + '%';
      if(index < colors.length - 1){ gradient += ', '; }
    });
    gradient += ')';
    return gradient;
  }
}
