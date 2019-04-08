import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { filter as loFilter, map as loMap } from 'lodash';

import { defaultIcons } from './default-icons';
import { RegisterIcon, RegistrationError, RegistrationSuccess } from './icon-registry.action';
import { IconDefinition } from './icon-registry.model';

/**
 * Determines the `MatIconRegistry` method and arguments to invoke for a specific `IconDefinition`.
 *
 * @param definition The definition for which to determine the appropriate method and arguments.
 * @returns An object containing the `MatIconRegistry` method name and argument to invoke it with.
 */
function getRegistrationMethod({ name, namespace, url, html }: IconDefinition): { methodName: string, args: any[] } {
  if (!url && !html) {
    throw new Error('IconDefinition must have either an url or html');
  }

  let methodName: string;
  if (name && namespace) {
    methodName = url ? 'addSvgIconInNamespace' : 'addSvgIconLiteralInNamespace';
  } else if (name) {
    methodName = url ? 'addSvgIcon' : 'addSvgIconLiteral';
  } else if (namespace) {
    methodName = url ? 'addSvgIconSetInNamespace' : 'addSvgIconSetLiteralInNamespace';
  } else {
    methodName = url ? 'addSvgIconSet' : 'addSvgIconSetLiteral';
  }

  return { methodName, args: loFilter([namespace, name, url || html]) };
}

/**
 * State handling the registration of icons for use with `mat-icon`.
 */
@State({
  name: 'iconRegistry'
})
export class IconRegistryState implements NgxsOnInit {
  /**
   * Handle `RegisterIcon` actions.
   *
   * @param context The state context.
   * @param action The `RegisterIcon` action.
   */
  @Action(RegisterIcon)
  registerIcon({ dispatch }: StateContext<{}>, { definition }: RegisterIcon): void {
    try {
      const { methodName, args } = getRegistrationMethod(definition);

      this.registry[methodName](...args);
      dispatch(new RegistrationSuccess());
    } catch (error) {
      dispatch(new RegistrationError(error));
    }
  }

  /**
   * Creates an instance of icon registry state.
   *
   * @param registry Material icon registry.
   * @param sanitizer Service used to sanitize urls and html.
   */
  constructor(private registry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  /**
   * Ngxs' OnInit hook.
   * Registers the default icons.
   *
   * @param context The state context.
   */
  ngxsOnInit({ dispatch }: StateContext<{}>) {
    const { sanitizer } = this;
    const actions = loMap(defaultIcons, (def) => new RegisterIcon({
      ...def,
      url: def.url && sanitizer.bypassSecurityTrustResourceUrl(def.url),
      html: def.html && sanitizer.bypassSecurityTrustHtml(def.html)
    }));

    dispatch(actions);
  }
}
