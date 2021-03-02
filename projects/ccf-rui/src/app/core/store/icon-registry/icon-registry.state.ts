import { Inject, Injectable, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';

import { GlobalConfig, GLOBAL_CONFIG } from '../../services/config/config';
import { DEFAULT_ICONS } from './default-icons';


/**
 * Object definition for registering new svg icons.
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


/**
 * State handling the registration of icons for use with `mat-icon`.
 */
@StateRepository()
@State<void>({ name: 'iconRegistry' })
@Injectable()
export class IconRegistryState extends NgxsDataRepository<void> {
  /**
   * Creates an instance of icon registry state.
   *
   * @param registry Material icon registry.
   * @param sanitizer Service used to sanitize default imported urls and html.
   */
  constructor(@Optional() private registry: MatIconRegistry | null,
              sanitizer: DomSanitizer,
              @Inject(GLOBAL_CONFIG) private readonly globalConfig: GlobalConfig) {
    super();

    for (const { name, namespace, url, html } of DEFAULT_ICONS) {
      const baseHref = globalConfig.baseHref || '';
      const safeDef: IconDefinition = {
        name, namespace,
        url: url && sanitizer.bypassSecurityTrustResourceUrl(baseHref + url),
        html: html && sanitizer.bypassSecurityTrustHtml(html)
      };

      this.registerIconImpl(safeDef);
    }
  }

  /**
   * Registers a svg icon for use in mat-icon.
   *
   * @param definition Icon to register.
   * @returns true if registration was successful, otherwise false.
   */
  @DataAction()
  registerIcon(definition: IconDefinition): boolean {
    return this.registerIconImpl(definition);
  }

  /**
   * Backing implementation of registerIcon.
   *
   * @param definition Icon to register.
   * @returns true if registration was successful, otherwise false.
   */
  private registerIconImpl(definition: IconDefinition): boolean {
    if (!this.registry) { return false; }
    if (!definition.url && !definition.html) { return false; }

    const registry = this.registry;
    const methodName = this.getMethodName(definition);
    const method = registry[methodName] as (...arg: unknown[]) => void;
    const args = this.getArguments(definition);

    if (!method) { return false; }
    try {
      method.apply(registry, args);
      return true;
    } catch (_error) {
      return false;
    }
  }

  /**
   * Selects the MatIconRegistry method used to register the icon.
   *
   * @param definition Icon definition.
   * @returns The name of the registry method.
   */
  private getMethodName({ name, namespace, url }: IconDefinition): string {
    const parts = ['addSvgIcon'];
    if (!name) { parts.push('Set'); }
    if (!url) { parts.push('Literal'); }
    if (namespace) { parts.push('InNamespace'); }
    return parts.join('');
  }

  /**
   * Selects the argument used to call the registration method.
   *
   * @param definition Icon definition.
   * @returns An array of arguments.
   */
  private getArguments({ name, namespace, url, html }: IconDefinition): unknown[] {
    const args: unknown[] = [namespace, name, url || html];
    return args.filter(value => !!value);
  }
}
