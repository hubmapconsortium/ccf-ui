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
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /**
   * Emits when the default scheme has changed.
   */
  @Output() schemeChange = new EventEmitter<ColorScheme>();

  /**
   * Used for keeping track of the order that layers get selected, for sorting purposes later.
   */
  currentLayerIndex = 0;

  /**
   * Array of indexes referring to the order that colors should be assigned in the scheme
   */
  assignmentOrder: number[] = [4, 2, 5, 1, 3, 6, 0];

  /**
   * Used by ngFor to track changes across ImageViewerLayer instances.
   *
   * @param layer The layer.
   * @returns The layer's unique id.
   */
  trackById(layer: ImageViewerLayer): string {
    return layer.id;
  }

  /**
   * Function in charge of handling the layers' checkbox change events.  It keeps track of layers' selected
   * and selectionOrder properties as well as emitting the updated layer list.
   * @param event contains whether or not the layer was selected or unselected.
   * @param layer is the layer that needs updating based on the event passed with it.
   */
  checkboxOnChange(layer: ImageViewerLayer): void {
    // const layerIndex = this.layers.indexOf(layer);
    // // Ugly workaround for deep mutations bug
    // layer = new ImageViewerLayer(this.layers[layerIndex]);
    // this.layers = [...this.layers];
    // this.layers[layerIndex] = layer;
    // // End of workaround

    // this.layers[layerIndex].selected = !this.layers[layerIndex].selected;

    // if (layer.selected) {
    //   this.handleSelect(layer);
    // } else {
    //   this.handleUnselect(layer);
    // }

    // this.currentLayerIndex++;
    // this.layers[layerIndex].selectionOrder = this.currentLayerIndex;
    // this.layerChange.emit(this.layers[layerIndex]);
    this.layerChange.emit(new ImageViewerLayer({
      ...layer,
      selected: !layer.selected
    }));
  }

  // /**
  //  * Updates assignment order array and handles color assignment when a layer is selected
  //  * @param layer The layer selected
  //  */
  // handleSelect(layer: ImageViewerLayer): void {
  //   const colors = layer.colorScheme.colors;
  //   if (this.assignmentOrder.length === 0) {
  //     this.assignmentOrder = [4, 2, 5, 1, 3, 6, 0];
  //   }
  //   if (!layer.customizedColor) {
  //     layer.color = colors[this.assignmentOrder[this.assignmentOrder.length - 1]];
  //     layer.defaultOrder = this.assignmentOrder[this.assignmentOrder.length - 1];
  //     this.assignmentOrder.pop();
  //   }
  // }

  // /**
  //  * When a layer is unselected, ppdates assignment order array and resets layer scheme to the current default scheme
  //  * @param layer The layer unselected
  //  */
  // handleUnselect(layer: ImageViewerLayer): void {
  //   if (!layer.customizedColor) {
  //     this.reorderAssignment(layer);
  //   } else {
  //     layer.customizedColor = false;
  //     layer.colorScheme = this.defaultScheme;
  //   }
  //   layer.defaultOrder = -1;
  // }

  // /**
  //  * Helper method to reorder the assignment order array when a layer is deselected / customized
  //  * @param layer The layer being deselected / customized
  //  */
  // reorderAssignment(layer: ImageViewerLayer): void {
  //   this.assignmentOrder.push(layer.defaultOrder);
  //   const newAssignmentOrder = [4, 2, 5, 1, 3, 6, 0].filter(idx => this.assignmentOrder.includes(idx));
  //   this.assignmentOrder = newAssignmentOrder;
  // }

  /**
   * This method captures changes to a layer's color options and updates the layers list accordingly
   * before emitting the new set of active layers.
   * @param layer the updated layer object.
   * @param referenceLayer the layer object before the changes, used for referencing which layer in the list to update.
   */
  layerChanged(layer: ImageViewerLayer): void {
    this.layerChange.emit(layer);
  }
}
