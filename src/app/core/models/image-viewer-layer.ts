import { ColorScheme } from './color-scheme';

export interface ImageViewerLayer {
  selected: boolean;
  label: string;
  id: number;
  colorScheme: ColorScheme;
  color: string;
  brightness: [number, number];
  transparency: number;
  customizedColor: boolean;
  selectionOrder: number;
  defaultOrder: number;
}
