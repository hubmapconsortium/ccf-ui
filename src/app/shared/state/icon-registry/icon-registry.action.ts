import { IconDefinition } from './icon-registry.model';

/**
 * Action for registering an icon either through an url or html.
 */
export class RegisterIcon {
  static readonly type = '[Icon Registry API] Register Icon';
  constructor(readonly definition: IconDefinition) { }
}

/**
 * Action dispatched on a successfully processed `RegisterIcon`.
 */
export class RegistrationSuccess {
  static readonly type = '[Icon Registry API] Icon Registration Success';
}

/**
 * Action dispatched when an error occurs during the handling of `RegisterIcon`.
 */
export class RegistrationError {
  static readonly type = '[Icon Registry API] Icon Registration Error';
  constructor(readonly error: Error) { }
}
