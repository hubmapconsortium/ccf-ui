
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

  { name: 'bladder', namespace: 'app', url: 'assets/icons/icons-organs_bladder.svg' },
  { name: 'brain', namespace: 'app', url: 'assets/icons/icons-organs_brain.svg' },
  { name: 'large_intestine', namespace: 'app', url: 'assets/icons/icons-organs_large-intestine.svg' },
  { name: 'heart', namespace: 'app', url: 'assets/icons/icons-organs_heart.svg' },
  { name: 'kidney', namespace: 'app', url: 'assets/icons/icons-organs_kidney.svg' },
  { name: 'kidney-right', namespace: 'app', url: 'assets/icons/icons-organs-kidney-right.svg' },
  { name: 'kidney-left', namespace: 'app', url: 'assets/icons/icons-organs-kidney-left.svg' },
  { name: 'liver', namespace: 'app', url: 'assets/icons/icons-organs_liver.svg' },
  { name: 'lung', namespace: 'app', url: 'assets/icons/icons-organs_lung.svg' },
  { name: 'lung-left', namespace: 'app', url: 'assets/icons/icons-organs-lung-left.svg' },
  { name: 'lung-right', namespace: 'app', url: 'assets/icons/icons-organs-lung-right.svg' },
  { name: 'lymph_nodes', namespace: 'app', url: 'assets/icons/icons-organs_lymph-nodes.svg' },
  { name: 'ovary-left', namespace: 'app', url: 'assets/icons/icons-organs_ovaries.svg' },
  { name: 'ovary-right', namespace: 'app', url: 'assets/icons/icons-organs_ovaries.svg' },
  { name: 'small_intestine', namespace: 'app', url: 'assets/icons/icons-organs_small-intestine.svg' },
  { name: 'spleen', namespace: 'app', url: 'assets/icons/icons-organs_spleen.svg' },
  { name: 'stomach', namespace: 'app', url: 'assets/icons/icons-organs_stomach.svg' },
  { name: 'thymus', namespace: 'app', url: 'assets/icons/icons-organs_thymus.svg' },

  { name: 'opacity', namespace: 'app', url: 'assets/icons/opacity-24px.svg' },
  { name: 'visibility_on', namespace: 'app', url: 'assets/icons/visibility-on-24px.svg' },
  { name: 'visibility_off', namespace: 'app', url: 'assets/icons/visibility-off-24px.svg' },
  { name: 'expand_more', namespace: 'app', url: 'assets/icons/expand_more-24px.svg' },
  { name: 'expand_less', namespace: 'app', url: 'assets/icons/expand_less-24px.svg' },
  { name: 'filter', url: 'assets/icons/filter.svg' }

  // Add default icons here!
];
