
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
  { name: 'bladder', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-bladder.svg' },
  { name: 'blood', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-blood.svg' },
  { name: 'bone-marrow', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-bone-marrow.svg' },
  { name: 'brain', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-brain.svg' },
  { name: 'mammary-gland', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-breast.svg' },
  { name: 'main-bronchus', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-extrapulmonary-bronchus.svg' },
  { name: 'eye', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-eye.svg' },
  { name: 'fallopian-tube-left', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-fallopian-tube-left.svg' },
  { name: 'fallopian-tube-right', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-fallopian-tube-right.svg' },
  { name: 'heart', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-heart.svg' },
  { name: 'kidney-left', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-kidney-left.svg' },
  { name: 'kidney-right', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-kidney-right.svg' },
  { name: 'kidneys', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-kidneys.svg' },
  { name: 'knee', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-knee.svg' },
  { name: 'large-intestine', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-large-intestine.svg' },
  { name: 'larynx', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-larynx.svg' },
  { name: 'liver', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-liver.svg' },
  { name: 'lung-left', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-lung-left.svg' },
  { name: 'lung-right', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-lung-right.svg' },
  { name: 'lung', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-lungs.svg' },
  { name: 'lymph-nodes', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-lymph-nodes.svg' },
  { name: 'neurons', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-neurons.svg' },
  { name: 'ovaries', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-ovaries.svg' },
  { name: 'ovary-left', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-ovary-left.svg' },
  { name: 'ovary-right', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-ovary-right.svg' },
  { name: 'palatine-tonsil', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-palatine-tonsil.svg' },
  { name: 'pancreas', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-pancreas.svg' },
  { name: 'pelvis-f', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-pelvis.svg' },
  { name: 'placenta', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-placenta.svg' },
  { name: 'prostate', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-prostate.svg' },
  { name: 'skin', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-skin.svg' },
  { name: 'small-intestine', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-small-intestine.svg' },
  { name: 'spinal-cord', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-spinal-cord.svg' },
  { name: 'spleen', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-spleen.svg' },
  { name: 'stomach', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-stomach.svg' },
  { name: 'thymus', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-thymus.svg' },
  { name: 'trachea', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-trachea.svg' },
  { name: 'ureter-left', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-ureter-left.svg' },
  { name: 'ureter-right', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-ureter-right.svg' },
  { name: 'uterus', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-uterus.svg' },
  { name: 'vasculature-thick', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-vasculature-thick.svg' },
  { name: 'vasculature-thin', namespace: 'app', url: 'assets/icons/organ-icons/organ-icon-vasculature-thin.svg' },

  { name: 'opacity', namespace: 'app', url: 'assets/icons/opacity-24px.svg' },
  { name: 'visibility_on', namespace: 'app', url: 'assets/icons/visibility-on-24px.svg' },
  { name: 'visibility_off', namespace: 'app', url: 'assets/icons/visibility-off-24px.svg' },
  { name: 'visibility_off_cube', namespace: 'app', url: 'assets/icons/ico-cube.svg' }
];
