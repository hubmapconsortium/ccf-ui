
/**
 * Object definition for icon that should be loaded on startup.
 * Unlike runtime registration object this does not need url ot html
 * to be sanitized before hand.
 */
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


/**
 * Icons registered at startup.
 */
export const DEFAULT_ICONS: DefaultIconDefinition[] = [
  { name: 'logo', namespace: 'app', url: 'assets/icons/app/hubmap-logo.svg' },

  { name: 'filter', url: 'assets/icons/filter.svg' }

  // Add default icons here!
];
