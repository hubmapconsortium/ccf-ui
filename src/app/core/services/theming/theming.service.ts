import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentRef, Inject, Injectable, InjectionToken, Optional, Renderer2 } from '@angular/core';

const DEFAULT_THEME_CLASS = 'default-theme';

export const DEFAULT_THEME = new InjectionToken<string>('Default theme class', {
  providedIn: 'root',
  factory: () => DEFAULT_THEME_CLASS
});

export function bootstrap(component: ComponentRef<unknown>): void {
  const service = component.injector.get(ThemingService);
  service.initialize(component);
}

@Injectable()
export class ThemingService {
  private component?: ComponentRef<unknown>;
  private defaultTheme: string;
  private theme: string;

  constructor(@Optional() @Inject(DEFAULT_THEME) defaultTheme?: string) {
    this.defaultTheme = defaultTheme ? defaultTheme : DEFAULT_THEME_CLASS;
    this.theme = this.defaultTheme;
  }

  getTheme(): string {
    return this.theme;
  }

  setTheme(theme: string): void {
    this.clearThemeClass(this.theme);
    this.setThemeClass(theme);
    this.theme = theme;
  }

  resetTheme(): void {
    this.setTheme(this.defaultTheme);
  }


  initialize(component: ComponentRef<unknown>): void {
    if (this.component) {
      throw new Error('Theming service has already been initialized!');
    }

    this.component = component;
    this.setThemeClass(this.theme);
  }

  private getRenderer(): Renderer2 | undefined {
    return this.component?.injector.get(Renderer2, null) ?? undefined;
  }

  private getRoot(): HTMLElement | undefined {
    return this.component?.location.nativeElement as HTMLElement;
  }

  private getOverlay(): HTMLElement | undefined {
    return this.component?.injector.get(OverlayContainer, null)?.getContainerElement();
  }

  private setThemeClass(cls: string): void {
    const renderer = this.getRenderer();
    const root = this.getRoot();
    const overlay = this.getOverlay();

    if (renderer && root) {
      renderer.addClass(root, cls);
    }
    if (renderer && overlay) {
      renderer.addClass(overlay, cls);
    }
  }

  private clearThemeClass(cls: string): void {
    const renderer = this.getRenderer();
    const root = this.getRoot();
    const overlay = this.getOverlay();

    if (renderer && root) {
      renderer.removeClass(root, cls);
    }
    if (renderer && overlay) {
      renderer.removeClass(overlay, cls);
    }
  }
}
