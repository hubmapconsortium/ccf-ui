import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

@Component({
  selector: 'ccf-image-viewer-layers',
  templateUrl: './image-viewer-layers.component.html',
  styleUrls: ['./image-viewer-layers.component.scss']
})
export class ImageViewerLayersComponent {
  @Input() layers: ImageViewerLayer[];
  @Output() selectedLayers = new EventEmitter<ImageViewerLayer[]>();

  currentLayerIndex = 0;

  checkboxOnChange(event: MatCheckboxChange, layer: ImageViewerLayer): void {
    const layerIndex = this.layers.indexOf(layer);
    this.layers[layerIndex].selected = !this.layers[layerIndex].selected;

    if (event.checked){
      this.currentLayerIndex++;
      this.layers[layerIndex].selectionOrder = this.currentLayerIndex;
    }else{
      delete this.layers[layerIndex].selectionOrder;
    }

    this.selectedLayers.emit(this.activeLayers());
  }

  activeLayers(): ImageViewerLayer[] {
    let layers = this.layers.filter(layer => layer.selected );
    layers = layers.sort((a, b) => {
      if (!a.selectionOrder) { return -1; }
      if (!b.selectionOrder) { return 1; }
      if (a.selectionOrder > b.selectionOrder) { return 1; }
      return -1;
    });
    console.log('layers: ', layers);
    return layers;
  }

  launchPicker(layer: ImageViewerLayer): void {
    console.log('launch layer: ', layer);
  }
}
