
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
  // Reference Organs
  { name: 'bladder', namespace: 'app', url: 'assets/icons/organs/ico-organs-bladder.svg' },
  { name: 'blood', namespace: 'app', url: 'assets/icons/organs/ico-organs-blood.svg' },
  { name: 'bone-marrow', namespace: 'app', url: 'assets/icons/organs/ico-organs-bone-marrow.svg' },
  { name: 'brain', namespace: 'app', url: 'assets/icons/organs/ico-organs-brain.svg' },
  { name: 'eye', namespace: 'app', url: 'assets/icons/organs/ico-organs-eye.svg' },
  { name: 'fallopian-tube-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-fallopian-tube-left.svg' },
  { name: 'fallopian-tube-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-fallopian-tube-right.svg' },
  { name: 'heart', namespace: 'app', url: 'assets/icons/organs/ico-organs-heart.svg' },
  { name: 'kidney-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-kidney-left.svg' },
  { name: 'kidney-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-kidney-right.svg' },
  { name: 'kidney', namespace: 'app', url: 'assets/icons/organs/ico-organs-kidney.svg' },
  { name: 'knee', namespace: 'app', url: 'assets/icons/organs/ico-organs-knee.svg' },
  { name: 'large-intestine', namespace: 'app', url: 'assets/icons/organs/ico-organs-large-intestine.svg' },
  { name: 'liver', namespace: 'app', url: 'assets/icons/organs/ico-organs-liver.svg' },
  { name: 'lung-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-lung-left.svg' },
  { name: 'lung-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-lung-right.svg' },
  { name: 'lung', namespace: 'app', url: 'assets/icons/organs/ico-organs-lung.svg' },
  { name: 'lymph-nodes', namespace: 'app', url: 'assets/icons/organs/ico-organs-lymph-nodes.svg' },
  { name: 'mammary-gland', namespace: 'app', url: 'assets/icons/organs/ico-organs-breast.svg' },
  { name: 'neuron', namespace: 'app', url: 'assets/icons/organs/ico-organs-neuron.svg' },
  { name: 'ovaries', namespace: 'app', url: 'assets/icons/organs/ico-organs-ovaries.svg' },
  { name: 'ovary-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-ovary-left.svg' },
  { name: 'ovary-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-ovary-right.svg' },
  { name: 'pancreas', namespace: 'app', url: 'assets/icons/organs/ico-organs-pancreas.svg' },
  { name: 'pelvis-f', namespace: 'app', url: 'assets/icons/organs/ico-organs-pelvis-f.svg' },
  { name: 'placenta', namespace: 'app', url: 'assets/icons/organs/ico-organs-placenta.svg' },
  { name: 'prostate', namespace: 'app', url: 'assets/icons/organs/ico-organs-prostate.svg' },
  { name: 'skin', namespace: 'app', url: 'assets/icons/organs/ico-organs-skin.svg' },
  { name: 'small-intestine', namespace: 'app', url: 'assets/icons/organs/ico-organs-small intestine.svg' },
  { name: 'spinal-cord', namespace: 'app', url: 'assets/icons/organs/ico-organs-spinal-cord.svg' },
  { name: 'spleen', namespace: 'app', url: 'assets/icons/organs/ico-organs-spleen.svg' },
  { name: 'stomach', namespace: 'app', url: 'assets/icons/organs/ico-organs-stomach.svg' },
  { name: 'thymus', namespace: 'app', url: 'assets/icons/organs/ico-organs-thymus.svg' },
  { name: 'ureter-left', namespace: 'app', url: 'assets/icons/organs/ico-organs-ureter-left.svg' },
  { name: 'ureter-right', namespace: 'app', url: 'assets/icons/organs/ico-organs-ureter-right.svg' },
  { name: 'uterus', namespace: 'app', url: 'assets/icons/organs/ico-organs-uterus.svg' },
  { name: 'vasculature-thick', namespace: 'app', url: 'assets/icons/organs/ico-organs-vasculature-thick.svg' },
  { name: 'vasculature-thin', namespace: 'app', url: 'assets/icons/organs/ico-organs-vasculature-thin.svg' },

  { name: 'opacity', namespace: 'app', url: 'assets/icons/opacity-24px.svg' },
  { name: 'visibility_on', namespace: 'app', url: 'assets/icons/visibility-on-24px.svg' },
  { name: 'visibility_off', namespace: 'app', url: 'assets/icons/visibility-off-24px.svg' },
  { name: 'expand_more', namespace: 'app', url: 'assets/icons/expand_more-24px.svg' },
  { name: 'expand_less', namespace: 'app', url: 'assets/icons/expand_less-24px.svg' },
  { name: 'filter', url: 'assets/icons/filter.svg' }
];
