import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

/**
 * Component in charge of rendering list of the image layers along with the ability
 * to choose which ones are to be showm and what display properties they have.
 */
@Component({
  selector: 'ccf-image-viewer-layers',
  templateUrl: './image-viewer-layers.component.html',
  styleUrls: ['./image-viewer-layers.component.scss']
})
export class ImageViewerLayersComponent {
  /**
   * The list of layers to be displayed which contain the styilng properties needed
   * to make rendering decisions.
   */

  @Input() layers: ImageViewerLayer[];
  /**
   * A sorted list of selected layers containing information such as selectionOrder and colorScheme.
   */

  @Output() selectedLayers = new EventEmitter<ImageViewerLayer[]>();

  /**
   * Used for keeping track of the order that layers get selected, for sorting purposes later.
   */
  currentLayerIndex = 0;

  /**
   * Function in charge of handling the layers' checkbox change events.  It keeps track of layers' selected
   * and selectionOrder properties as well as emitting the updated layer list.
   * @param event contains whether or not the layer was selected or unselected.
   * @param layer is the layer that needs updating based on the event passed with it.
   */
  checkboxOnChange(layer: ImageViewerLayer): void {
    const layerIndex = this.layers.indexOf(layer);
    this.layers[layerIndex].selected = !this.layers[layerIndex].selected;

    if (layer.selected) {
      this.currentLayerIndex++;
      this.layers[layerIndex].selectionOrder = this.currentLayerIndex;
    }

    this.selectedLayers.emit(this.activeLayers());
  }

  /**
   * A helper method which filters out unselected layers, then sorts the remaining layers
   * based on their selectionOrder property.
   */
  activeLayers(): ImageViewerLayer[] {
    let layers = this.layers.filter(layer => layer.selected);
    layers = layers.sort((a, b) => {
      if (a.selectionOrder > b.selectionOrder) { return 1; }
      return -1;
    });
    return layers;
  }

  /**
   * This method captures changes to a layer's color options and updates the layers list accordingly
   * before emitting the new set of active layers.
   * @param layer the updated layer object.
   * @param referenceLayer the layer object before the changes, used for referencing which layer in the list to update.
   */
  layerChange(layer: ImageViewerLayer, referenceLayer: ImageViewerLayer): void {
    this.layers[this.layers.indexOf(referenceLayer)] = layer;
    this.selectedLayers.emit(this.activeLayers());
  }
}
