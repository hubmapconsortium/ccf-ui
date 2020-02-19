import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentRef, Inject, Injectable, InjectionToken, Optional, Renderer2 } from '@angular/core';

export const DEFAULT_THEME = new InjectionToken<string>('Default theme class');

export function bootstrap(component: ComponentRef<unknown>): void {
  const service = component.injector.get(ThemingService);
  service.initialize(component);
}

@Injectable()
export class ThemingService {
  private component?: ComponentRef<unknown>;
  private defaultTheme: string;
  private theme: string;

  constructor(@Optional() @Inject(DEFAULT_THEME) defaultTheme: string | null) {
    this.defaultTheme = this.theme = defaultTheme || '';
  }

  getTheme(): string {
    return this.theme;
  }

  setTheme(theme: string): void {
    if (theme === this.theme) { return; }
    this.applyThemeClass(this.theme, 'remove');
    this.applyThemeClass(theme);
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
    this.applyThemeClass(this.theme);
  }

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
