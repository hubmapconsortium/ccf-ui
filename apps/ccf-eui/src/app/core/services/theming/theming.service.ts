/* eslint-disable @typescript-eslint/member-ordering */
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ComponentRef,
  ElementRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  Renderer2,
} from '@angular/core';

/** Token for specifying the default theme class. */
export const DEFAULT_THEME = new InjectionToken<string>('Default theme class');

/**
 * Manages the currently active theme.
 */
@Injectable()
export class ThemingService {
  private element!: ElementRef<unknown>;
  private injector!: Injector;
  /** Default theme class. */
  private defaultTheme: string;
  /** Currently active theme class. */
  private theme: string;

  /** Initializer called during bootstrap to set up theming. */
  static initialize(component: ComponentRef<unknown>): void {
    const { injector, location } = component;
    const service = injector.get(ThemingService);
    service.initialize(location, injector);
  }

  /**
   * Creates the theming service.
   *
   * @param defaultTheme An optional default theme.
   */
  constructor(@Optional() @Inject(DEFAULT_THEME) defaultTheme: string | null) {
    this.defaultTheme = this.theme = defaultTheme ?? '';
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
    if (theme === this.theme) {
      return;
    }
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
   * Binds theming service to a component.
   *
   * @param component The top level component.
   * @throws {Error} If the theming service has already been initialized.
   */
  initialize(element: ElementRef<unknown>, injector: Injector): void {
    this.element = element;
    this.injector = injector;
    this.applyThemeClass(this.getTheme());
  }

  /**
   * Adds or removes a theme class from the necessary components.
   *
   * @param cls The theme class.
   * @param method Whether to add or remove the theme.
   */
  private applyThemeClass(cls: string, method: 'add' | 'remove' = 'add'): void {
    const { element, injector } = this;
    if (!cls || !element || !injector) {
      return;
    }

    const renderer = injector.get(Renderer2, null);
    if (!renderer) {
      return;
    }

    const root = element.nativeElement as HTMLElement;
    const overlay = injector.get(OverlayContainer, null)?.getContainerElement();
    const methodName = method === 'add' ? 'addClass' : 'removeClass';

    renderer[methodName](root, cls);
    if (overlay) {
      renderer[methodName](overlay, cls);
    }
  }
}
