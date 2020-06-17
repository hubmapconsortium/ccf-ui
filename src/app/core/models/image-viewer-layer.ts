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

}

/**
 * Converts a hex color code to RGB and calculates a value for the color brightness
 * @param color Hex color code
 * @returns brightness value
 */
function getBrightness(color: string): number {
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

  const hsp = Math.sqrt(0.299*(r**2) + 0.587*(g**2) + 0.114*(b**2));
  return hsp;
}

/**
 * Determines whether the color icon is light enough to require a border (light mode only)
 * @param color The color hex code
 * @returns true if brightness is above a certain threshold
 */
export function isLight(color: string): boolean {
  return getBrightness(color) > 225 ? true : false;
}

/**
 * Determines whether the color icon is dark enough to require a border (dark mode only)
 * @param color The color hex code
 * @returns true if brightness is below a certain threshold
 */
export function isDark(color: string): boolean {
  return getBrightness(color) < 75 ? true : false;
}
