import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme } from '../../color-scheme/color-schemes';


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
   * Array of indexes referring to the order that colors should be assigned in the scheme
   */
  assignmentOrder: number[] = [4, 2, 5, 1, 3, 6, 0];

  /**
   * The current scheme applied to all non-customized layers (from the scheme dropdown)
   */
  defaultScheme: ColorScheme;

  /**
   * Function in charge of handling the layers' checkbox change events.  It keeps track of layers' selected
   * and selectionOrder properties as well as emitting the updated layer list.
   * @param event contains whether or not the layer was selected or unselected.
   * @param layer is the layer that needs updating based on the event passed with it.
   */
  checkboxOnChange(layer: ImageViewerLayer): void {
    const layerIndex = this.layers.indexOf(layer);
    // Ugly workaround for deep mutations bug
    this.layers = [...this.layers];
    this.layers[layerIndex] = new ImageViewerLayer(this.layers[layerIndex]);
    // End of workaround

    this.layers[layerIndex].selected = !this.layers[layerIndex].selected;

    if (layer.selected) {
      this.handleSelect(layer);
    } else {
      this.handleUnselect(layer);
    }

    this.currentLayerIndex++;
    this.layers[layerIndex].selectionOrder = this.currentLayerIndex;
    this.selectedLayers.emit(this.layers);
  }

  /**
   * Updates assignment order array and handles color assignment when a layer is selected
   * @param layer The layer selected
   */
  handleSelect(layer: ImageViewerLayer): void {
    const colors = layer.colorScheme.colors;
    if (this.assignmentOrder.length === 0) {
      this.assignmentOrder = [4, 2, 5, 1, 3, 6, 0];
    }
    if (!layer.customizedColor) {
      layer.color = colors[this.assignmentOrder[this.assignmentOrder.length-1]];
      layer.defaultOrder = this.assignmentOrder[this.assignmentOrder.length-1];
      this.assignmentOrder.pop();
    }
  }

  /**
   * When a layer is unselected, ppdates assignment order array and resets layer scheme to the current default scheme
   * @param layer The layer unselected
   */
  handleUnselect(layer: ImageViewerLayer): void {
    if(!layer.customizedColor) {
      this.reorderAssignment(layer);
    } else {
      layer.customizedColor = false;
      layer.colorScheme = this.defaultScheme;
    }
    layer.defaultOrder = -1;
  }

  /**
   * Helper method to reorder the assignment order array when a layer is deselected / customized
   * @param layer The layer being deselected / customized
   */
  reorderAssignment(layer: ImageViewerLayer): void {
    this.assignmentOrder.push(layer.defaultOrder);
    const newAssignmentOrder = [4,2,5,1,3,6,0].filter(idx => this.assignmentOrder.includes(idx));
    this.assignmentOrder = newAssignmentOrder;
  }

  /**
   * A helper method which filters out unselected layers, then sorts the remaining layers
   * based on their selectionOrder property.
   */
  activeLayers(): ImageViewerLayer[] {
    let layers = this.layers.filter(layer => layer.selected);
    layers = layers.sort((a, b) => {
      if (a.selectionOrder > b.selectionOrder) {
        return 1;
      }
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
  layerChange(layer: ImageViewerLayer, index: number): void {
    if (layer.customizedColor) {
      this.reorderAssignment(layer);
    }
    this.layers = [...this.layers]; // Again ugly workaround
    this.layers[index] = layer;
    this.selectedLayers.emit(this.layers);
  }

  /**
   * Updates scheme for all non-customized layers when selected from the scheme dropdown menu
   * @param schemeChange The scheme selected from the dropdown
   */
  updateLayerScheme(schemeChange: ColorScheme): void {
    this.defaultScheme = schemeChange;
    for (const layer of this.layers) {
      if (!layer.customizedColor) {
        const colorIndex = layer.colorScheme.colors.indexOf(layer.color);
        layer.colorScheme = schemeChange;
        layer.color = schemeChange.colors[colorIndex];
      }
    }
    this.selectedLayers.emit(this.layers);
  }
}
