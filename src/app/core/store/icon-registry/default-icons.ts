
export interface DefaultIconDefinition {
  /**
   * Name to register the icon under.
   */
  name?: string;

  /**
   * Namespace to register the icon or icon set under.
   */
  namespace?: string;

  /**
   * Url to fetch the icon or icon set from.
   */
  url?: string;

  /**
   * Html containing the svg of the icon or icon set.
   */
  html?: string;
}


export const DEFAULT_ICONS: DefaultIconDefinition[] = [
  { name: 'logo', namespace: 'app', url: 'assets/icons/app/hubmap-logo.svg' },

  { name: 'filter', url: 'assets/icons/filter.svg' }

  // Add default icons here!
];
