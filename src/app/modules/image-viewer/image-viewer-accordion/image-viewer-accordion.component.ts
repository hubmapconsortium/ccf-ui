import { Component, Input } from '@angular/core';
import { ImageViewerLayer } from 'src/app/core/models/ImageViewerLayer';

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
      colorScheme: 'red-blue',
      color: 'red',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD107a',
      id: 122,
      colorScheme: 'red-blue',
      color: 'blue',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD11c',
      id: 323,
      colorScheme: 'red-blue',
      color: 'orange',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD20',
      id: 32,
      colorScheme: 'red-blue',
      color: 'purple',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD21',
      id: 65,
      colorScheme: 'red-blue',
      color: 'pink',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD31',
      id: 89,
      colorScheme: 'red-blue',
      color: 'gray',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD3e',
      id: 1223,
      colorScheme: 'red-blue',
      color: 'brown',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD4',
      id: 1323,
      colorScheme: 'red-blue',
      color: 'blue',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD45',
      id: 654,
      colorScheme: 'red-blue',
      color: 'yellow',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD45RO',
      id: 665,
      colorScheme: 'red-blue',
      color: 'red',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD68',
      id: 14423,
      colorScheme: 'red-blue',
      color: 'orange',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'CD8',
      id: 1444223,
      colorScheme: 'red-blue',
      color: 'green',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'DAPI_2',
      id: 12113,
      colorScheme: 'red-blue',
      color: 'orange',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'E_CAD',
      id: 1111423,
      colorScheme: 'red-blue',
      color: 'pink',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'Histone_H3',
      id: 123778,
      colorScheme: 'red-blue',
      color: 'yellow',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'Ki67',
      id: 12313,
      colorScheme: 'red-blue',
      color: 'green',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'Pan_CK',
      id: 11623,
      colorScheme: 'red-blue',
      color: 'purple',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    },
    {
      selected: false,
      label: 'Podoplanin',
      id: 3,
      colorScheme: 'red-blue',
      color: 'gray',
      brightness: [20, 60],
      customizedColor: false,
      selectionOrder: undefined
    }
  ];

}
