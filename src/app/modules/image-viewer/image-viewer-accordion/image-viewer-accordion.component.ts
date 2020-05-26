import { Component, Input } from '@angular/core';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';

/**
 * Expandable accordion panel for the image viewer
 */
@Component({
  selector: 'ccf-image-viewer-accordion',
  templateUrl: './image-viewer-accordion.component.html',
  styleUrls: ['./image-viewer-accordion.component.scss']
})
export class ImageViewerAccordionComponent {

  /**
   * Metadata of image to be displayed in the About panel
   */
  @Input() metadata: { label: string; value: string; }[];

  testLayers: ImageViewerLayer[] = [
    {
      selected: false,
      label: 'Actin',
      id: 123,
      colorScheme: {
        type: 'discrete',
        name: 'bluered',
        colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
        positions: [0, .166, .333, .5, .666, .833, 1]
      },
      color: '#B2182B',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: 0
    },
    {
      selected: false,
      label: 'CD107a',
      id: 122,
      colorScheme: {
        type: 'discrete',
        name: 'bluered',
        colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
        positions: [0, .166, .333, .5, .666, .833, 1]
      },
      color: '#2166AC',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: 0
    },
    {
      selected: false,
      label: 'CD11c',
      id: 323,
      colorScheme: {
        type: 'gradient',
        name: 'viridis',
        colors: ['#FFE31C', '#21908A', '#450B57'],
        positions: [0, .5, 1]
      },
      color: 'orange',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: 0
    },
    {
      selected: false,
      label: 'CD20',
      id: 32,
      colorScheme: {
        type: 'gradient',
        name: 'viridis',
        colors: ['#FFE31C', '#21908A', '#450B57'],
        positions: [0, .5, 1]
      },
      color: 'purple',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: 0
    }
  ];

}
