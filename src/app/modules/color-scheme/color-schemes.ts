/**
 * Color scheme to be used in visualizing layers of the image
 */
export interface ColorScheme {

  /**
   * Whether the scheme is discrete or gradient
   */
  type: 'discrete' | 'gradient';

  /**
   * Name of scheme
   */
  name: string;

  /**
   * Colors used in the scheme
   */
  colors: string[];

  /**
   * Positions for mapping the data to colors
   */
  positions: number[];
}

/**
 * Default Scheme1 (discrete)
 */
export const BLUERED: ColorScheme = {
  type: 'discrete',
  name: 'bluered',
  colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme2 (discrete)
 */
export const GREENRED: ColorScheme = {
  type: 'discrete',
  name: 'greenred',
  colors: ['#1A9850', '#91CF60', '#D9EF8B', '#FFFFBF', '#FEE08B', '#FC8D59', '#D73027'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme3 (discrete)
 */
export const PURPLEBROWN: ColorScheme = {
  type: 'discrete',
  name: 'purplebrown',
  colors: ['#542788', '#998EC3', '#D8DAEB', '#F7F7F7', '#FEE0B6', '#F1A340', '#B35806'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme4 (discrete)
 */
export const REDTAN: ColorScheme = {
  type: 'discrete',
  name: 'redtan',
  colors: ['#990000', '#D7301F', '#EF6548', '#FC8D59', '#FDBB84', '#FDD49E', '#FEF0D9'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme5 (discrete)
 */
export const PURPLELIGHTBLUE: ColorScheme = {
  type: 'discrete',
  name: 'purplelightblue',
  colors: ['#6E016B', '#88419D', '#8C6BB1', '#8C96C6', '#9EBCDA', '#BFD3E6', '#EDF8FB'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme6 (gradient)
 */
export const VIRIDIS: ColorScheme = {
  type: 'gradient',
  name: 'viridis',
  colors: ['#FFE31C', '#B5C740', '#6BAB65', '#21908A', '#2D6379', '#393768', '#450B57'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme7 (gradient)
 */
export const MAGMA: ColorScheme = {
  type: 'gradient',
  name: 'magma',
  colors: ['#F8FC9D', '#E1B986', '#CA7670', '#B4335A', '#78223C', '#3D121F', '#020202'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme8 (gradient)
 */
export const PLASMA: ColorScheme = {
  type: 'gradient',
  name: 'plasma',
  colors: ['#F2F424', '#E3B842', '#D47D60', '#C6427E', '#883381', '#4A2484', '#0C1687'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default scheme options
 */
export const DEFAULT_COLOR_SCHEMES = [
  BLUERED,
  GREENRED,
  PURPLEBROWN,
  REDTAN,
  PURPLELIGHTBLUE,
  // VIRIDIS,
  // MAGMA,
  // PLASMA
];

/**
 * Object containing scheme and color index info to be emitted when a change is made
 */
export interface ColorSchemeSelection {

  /**
   * Current scheme selected
   */
  scheme: ColorScheme;

  /**
   * Index of the selected color in scheme
   */
  coloridx: number;
}
