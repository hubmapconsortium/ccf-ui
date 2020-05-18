export interface ImageViewerLayer {
    selected: boolean;
    label: string;
    id: number;
    colorScheme: string;
    color: string;
    brightness: [number, number];
    customizedColor: boolean;
    selectionOrder?: number;
  }