
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
  { name: 'logo', namespace: 'app', url: 'assets/icons/logo-rui.svg' },

  // Reference Organs
  { name: 'bladder', namespace: 'app', url: 'assets/icons/organs/ico-organs_bladder.svg' },
  { name: 'bone_marrow', namespace: 'app', url: 'assets/icons/organs/ico-organs-bone-marrow.svg' },
  { name: 'brain', namespace: 'app', url: 'assets/icons/organs/ico-organs_brain.svg' },
  { name: 'heart', namespace: 'app', url: 'assets/icons/organs/ico-organs_heart.svg' },
  { name: 'kidney-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-kidney-left.svg' },
  { name: 'kidney', namespace: 'app', url: 'assets/icons/organs/ico-organs_kidney.svg' },
  { name: 'kidney-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-kidney-right.svg' },
  { name: 'large_intestine', namespace: 'app', url: 'assets/icons/organs/ico-organs-large-intestine.svg' },
  { name: 'liver', namespace: 'app', url: 'assets/icons/organs/ico-organs_liver.svg' },
  { name: 'lung-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-lung-left.svg' },
  { name: 'lung', namespace: 'app', url: 'assets/icons/organs/ico-organs_lung.svg' },
  { name: 'lung-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-lung-right.svg' },
  { name: 'lymph_nodes', namespace: 'app', url: 'assets/icons/organs/ico-organs-lymph-nodes.svg' },
  { name: 'ovary-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-ovaries.svg' },
  { name: 'ovary-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-ovaries.svg' },
  { name: 'skin', namespace: 'app', url: 'assets/icons/organs/ico-organs-skin.svg' },
  { name: 'small_intestine', namespace: 'app', url: 'assets/icons/organs/ico-organs_small intestine.svg' },
  { name: 'spleen', namespace: 'app', url: 'assets/icons/organs/ico-organs_spleen.svg' },
  { name: 'stomach', namespace: 'app', url: 'assets/icons/organs/ico-organs-stomach.svg' },
  { name: 'thymus', namespace: 'app', url: 'assets/icons/organs/ico-organs-thymus.svg' },
  { name: 'vasculature', namespace: 'app', url: 'assets/icons/organs/ico-organs-vasculature-thick.svg' },

  { name: 'opacity', namespace: 'app', url: 'assets/icons/opacity-24px.svg' },
  { name: 'visibility_on', namespace: 'app', url: 'assets/icons/visibility-on-24px.svg' },
  { name: 'visibility_off', namespace: 'app', url: 'assets/icons/visibility-off-24px.svg' },
  { name: 'visibility_off_cube', namespace: 'app', url: 'assets/icons/ico-cube.svg' }
];
