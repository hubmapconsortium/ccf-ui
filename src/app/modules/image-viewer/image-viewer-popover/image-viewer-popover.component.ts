import { Component } from '@angular/core';

import { ImageViewerData } from 'ccf-database';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

/**
 * Popup that displays detailed information on a selected image along with viewing options
 */
@Component({
  selector: 'ccf-image-viewer-popover',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {

  /**
   * Data of the image to be passed into the viewer
   */
  data: ImageViewerData = {
    '@id': '',
    '@type': 'ImageViewerData',
    id: '',
    label: '',
    organName: '',
    metadata: [{label: '', value: ''}]
  };

  /**
   * Whether or not the image viewer is visible
   */
  viewerVisible = false;

  activeLayers: ImageViewerLayer[];

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
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1,
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
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1,
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
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1,
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
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1,
    }
  ];

  /**
   * Returns viewer to closed state
   */
  close(): void {
    this.viewerVisible = false;
  }

  /**
   * Changes viewer to opened state
   * @param data Data of the image to be passed into the viewer
   */
  open(data: ImageViewerData): void {
    this.viewerVisible = true;
    this.data = data;
  }

  /**
   * Captures any changes in the layers array passed up from children components
   * and uses it to update the list of layers
   * @param layers the updated list of layers
   */
  layersChanged(layers: ImageViewerLayer[]): void {
    this.testLayers = layers;
    this.activeLayers = this.getActiveLayers();
  }

  /**
   * A helper method which filters out unselected layers, then sorts the remaining layers
   * based on their selectionOrder property.
   */
  getActiveLayers(): ImageViewerLayer[] {
    let layers = this.testLayers.filter(layer => layer.selected);
    layers = layers.sort((a, b) => {
      if (a.selectionOrder > b.selectionOrder) { return 1; }
      return -1;
    });
    return layers;
  }
}
