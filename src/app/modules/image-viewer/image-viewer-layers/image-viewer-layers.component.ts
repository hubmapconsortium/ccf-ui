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
    this.layerChange.emit(new ImageViewerLayer({
      ...layer,
      selected: !layer.selected
    }));
  }

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
