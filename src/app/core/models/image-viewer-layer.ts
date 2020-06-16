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
  id: string;
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
      gradient += `${color} ${positions[index] * 100}%`;
      if (index < colors.length - 1) {
        gradient += ', ';
      }
    });
    gradient += ')';

    return gradient;
  }

  isLight(): boolean {
    const color = this.color;
    let r = '0';
    let g = '0';
    let b = '0';

    // 3 digits
    if (color.length === 4) {
      r = '0x' + color[1] + color[1];
      g = '0x' + color[2] + color[2];
      b = '0x' + color[3] + color[3];

    // 6 digits
    } else if (color.length === 7) {
      r = '0x' + color[1] + color[2];
      g = '0x' + color[3] + color[4];
      b = '0x' + color[5] + color[6];
    }

    const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    if (hsp>225) {
      return true;
    }
    else {
      return false;
    }
  }
}
