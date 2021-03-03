import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentRef, Inject, Injectable, InjectionToken, Optional, Renderer2 } from '@angular/core';

/** Token for specifying the default theme class. */
export const DEFAULT_THEME = new InjectionToken<string>('Default theme class');

/**
 * Manages the currently active theme.
 */
@Injectable()
export class ThemingService {
  /** Top level component on which themes are applied. */
  private component?: ComponentRef<unknown>;
  /** Default theme class. */
  private defaultTheme: string;
  /** Currently active theme class. */
  private theme: string;

  /** Initializer called during bootstrap to set up theming. */
  static initialize(component: ComponentRef<unknown>): void {
    const service = component.injector.get(ThemingService);
    service.initializeImpl(component);
  }

  /**
   * Creates the theming service.
   *
   * @param defaultTheme An optional default theme.
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(@Optional() @Inject(DEFAULT_THEME) defaultTheme: string | null) {
    this.defaultTheme = this.theme = defaultTheme || '';
  }

  /**
   * Get the currently active theme.
   */
  getTheme(): string {
    return this.theme;
  }

  /**
   * Sets the currently active theme.
   *
   * @param theme The new theme class.
   */
  setTheme(theme: string): void {
    if (theme === this.theme) { return; }
    this.applyThemeClass(this.theme, 'remove');
    this.applyThemeClass(theme);
    this.theme = theme;
  }

  /**
   * Resets the theme to the default.
   */
  resetTheme(): void {
    this.setTheme(this.defaultTheme);
  }


  /**
   * Implementation of initialize.
   *
   * @param component The top level component.
   * @throws {Error} If the theming service has already been initialized.
   */
  private initializeImpl(component: ComponentRef<unknown>): void {
    if (this.component) {
      throw new Error('Theming service has already been initialized!');
    }

    this.component = component;
    this.applyThemeClass(this.theme);
  }

  /**
   * Adds or removes a theme class from the necessary components.
   *
   * @param cls The theme class.
   * @param method Whether to add or remove the theme.
   */
  private applyThemeClass(cls: string, method: 'add' | 'remove' = 'add'): void {
    const component = this.component;
    if (!cls || !component) { return; }

    const renderer = component.injector.get(Renderer2, null);
    if (!renderer) { return; }

    const root = component.location.nativeElement as HTMLElement;
    const overlay = component.injector.get(OverlayContainer, null)?.getContainerElement();
    const methodName = method === 'add' ? 'addClass' : 'removeClass';

    renderer[methodName](root, cls);
    if (overlay) { renderer[methodName](overlay, cls); }
  }
}
