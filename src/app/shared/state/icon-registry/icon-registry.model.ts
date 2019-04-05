import { SafeResourceUrl, SafeHtml } from '@angular/platform-browser';

/**
 * Definitions for registering an icon.
 */
export interface IconDefinition {
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
  url?: SafeResourceUrl;

  /**
   * Html containing the svg of the icon or icon set.
   */
  html?: SafeHtml;
}
