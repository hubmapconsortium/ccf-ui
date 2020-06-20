import { ColorScheme } from './color-scheme';

export interface PureImageViewerLayer {
  id: string;
  label: string;

  colorScheme: ColorScheme;
  color: string;
  brightness: [number, number];
  transparency: number;

  selected: boolean;
  customizedColor: boolean;
  selectionOrder: number;
  defaultOrder: number;
}

export type ImageViewerLayerRequiredArgNames = 'id' | 'colorScheme';
export type ImageViewerLayerArgs =
  Pick<PureImageViewerLayer, ImageViewerLayerRequiredArgNames> &
  Partial<Omit<PureImageViewerLayer, ImageViewerLayerRequiredArgNames>>;

export class ImageViewerLayer implements PureImageViewerLayer {
  id: string;
  label: string;

  colorScheme: ColorScheme;
  color: string;
  brightness: [number, number] = [20, 60];
  transparency = 100;

  selected = false;
  customizedColor = false;
  selectionOrder = 0;
  defaultOrder = -1;

  constructor(data: ImageViewerLayerArgs) {
    Object.assign(this, {
      label: data.id,
      color: data.colorScheme.colors[0]
    }, data);
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

  /**
   * Converts the layer's hex color code to RGB and calculates a value for the color brightness
   */
  getBrightness(): number {
    const color = this.color;
    let r = 0;
    let g = 0;
    let b = 0;

    // 3 digits
    if (color.length === 4) {
      r = Number(`0x${color[1]}${color[1]}`);
      g = Number(`0x${color[2]}${color[2]}`);
      b = Number(`0x${color[3]}${color[3]}`);

    // 6 digits
    } else if (color.length === 7) {
      r = Number(`0x${color[1]}${color[2]}`);
      g = Number(`0x${color[3]}${color[4]}`);
      b = Number(`0x${color[5]}${color[6]}`);
    }

    return Math.sqrt(0.299*(r**2) + 0.587*(g**2) + 0.114*(b**2));
  }

  /**
   * Determines whether the color icon is light enough to require a border (light mode only)
   */
  isLight(): boolean {
    return this.getBrightness() > 225 ? true : false;
  }

  /**
   * Determines whether the color icon is dark enough to require a border (dark mode only)
   */
  isDark(): boolean {
    return this.getBrightness() < 75 ? true : false;
  }
}
