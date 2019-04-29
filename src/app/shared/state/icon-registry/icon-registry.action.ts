import { IconDefinition } from './icon-registry.model';

/**
 * Action for registering an icon either through an url or html.
 */
export class RegisterIcon {
  /** Action type */
  static readonly type = '[Icon Registry API] Register Icon';

  /**
   * Creates an instance of register icon.
   *
   * @param definition Data for the icon to register.
   */
  constructor(readonly definition: IconDefinition) { }
}

/**
 * Action dispatched on a successfully processed `RegisterIcon`.
 */
export class RegistrationSuccess {
  /** Action type */
  static readonly type = '[Icon Registry API] Icon Registration Success';
}

/**
 * Action dispatched when an error occurs during the handling of `RegisterIcon`.
 */
export class RegistrationError {
  /** Action type */
  static readonly type = '[Icon Registry API] Icon Registration Error';

  /**
   * Creates an instance of registration error.
   *
   * @param error The error that occured during registration of an icon.
   */
  constructor(readonly error: Error) { }
}
