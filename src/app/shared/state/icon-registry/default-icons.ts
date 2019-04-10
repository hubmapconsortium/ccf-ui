import { IconDefinition } from './icon-registry.model';

/**
 * Icon definition where url and html are strings instead of SafeResourceUrl or SafeHtml.
 */
export type DefaultIconDefinition = Exclude<IconDefinition, 'url' | 'html'> & {
  url?: string,
  html?: string
};

/**
 * Icons that should be registered at startup.
 */
export const defaultIcons: DefaultIconDefinition[] = [
  { name: 'male', namespace: 'gender', url: 'assets/icons/gender/male.svg' },
  { name: 'female', namespace: 'gender', url: 'assets/icons/gender/female.svg' },
  { name: 'male-female', namespace: 'gender', url: 'assets/icons/gender/male-female.svg' },
  { name: 'undefined', namespace: 'gender', url: 'assets/icons/gender/male-female.svg' },

  { name: 'body', namespace: 'toolbar', url: 'assets/icons/toolbar/body.svg' },
  { name: 'comment-outline', namespace: 'toolbar', url: 'assets/icons/toolbar/comment-outline.svg' },

  { name: 'hubmap-logo', namespace: 'app', url: 'assets/icons/app/hubmap-logo.svg' }

  // Add additional icons that should be loaded on startup here!
];
