import { Injectable, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { State } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';

import { GlobalConfig } from '../../services/config/config';
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
              private readonly sanitizer: DomSanitizer,
              private readonly globalConfig: GlobalConfigState<GlobalConfig>) {
    super();
  }

  ngxsOnInit(): void {
    // Register html icons as they don't depend on baseHref
    DEFAULT_ICONS
      .filter(def => def.html !== undefined)
      .map(def => ({ ...def, html: this.sanitizer.bypassSecurityTrustHtml(def.html!) }))
      .forEach(def => this.registerIconImpl(def));

    // Use resolver for url icons
    this.registry?.addSvgIconResolver((name, namespace) => {
      const def = DEFAULT_ICONS.find(
        icon => (icon.name ?? '') === name && (icon.namespace ?? '') === namespace
      );

      if (def?.url === undefined) {
        return null;
      }

      const baseHref = this.globalConfig.snapshot.baseHref ?? '';
      return this.sanitizer.bypassSecurityTrustResourceUrl(baseHref + def.url);
    });
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
    if (!this.registry) {
      return false;
    }
    if (!definition.url && !definition.html) {
      return false;
    }

    const registry = this.registry;
    const methodName = this.getMethodName(definition);
    const method = registry[methodName] as (...arg: unknown[]) => void;
    const args = this.getArguments(definition);

    if (!method) {
      return false;
    }
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
    if (!name) {
      parts.push('Set');
    }
    if (!url) {
      parts.push('Literal');
    }
    if (namespace) {
      parts.push('InNamespace');
    }
    return parts.join('');
  }

  /**
   * Selects the argument used to call the registration method.
   *
   * @param definition Icon definition.
   * @returns An array of arguments.
   */
  private getArguments({ name, namespace, url, html }: IconDefinition): unknown[] {
    const args: unknown[] = [namespace, name, url ?? html];
    return args.filter(value => !!value);
  }
}
