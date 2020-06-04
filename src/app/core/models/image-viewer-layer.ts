import { ColorScheme } from './color-scheme';

export class ImageViewerLayer {
  selected: boolean;
  color: string;
  brightness: [number, number];
  transparency: number;
  customizedColor: boolean;
  selectionOrder: number;
  defaultOrder: number;

  label: string;
  id: number;
  colorScheme: ColorScheme;

  constructor(data: Omit<ImageViewerLayer, 'background'>) {
    Object.assign(this, data);
  }

  /**
   * Dynamically creates a background style based on the layer's color or color scheme
   */
  get background(): string {
    if (this.colorScheme.type === 'discrete') {
      return this.color;
    }

    const colors = this.colorScheme.colors;
    const positions = this.colorScheme.positions;

    let gradient = 'linear-gradient(to right, ';
    colors.forEach((color, index) => {
      gradient += ` ${positions[index] * 100}%`;
      if (index < colors.length - 1) {
        gradient += ', ';
      }
    });
    gradient += ')';

    return gradient;
  }
}
