import {
  Message as GenericMessage, MessageChannel as GenericMessageChannel, MessageService as GenericMessageService,
} from '../../services/message/message.service';


/** Message sent when the content component changes. */
export interface ContentContainerChanged {
  /** Message type. */
  type: 'content-container-changed';
  /** A reference to the new content component. */
  content: unknown;
}

/** Message sent when a drawer component changes. */
export interface DrawerContainersChanged {
  /** Message type. */
  type: 'drawer-containers-changed';
  /** References to the drawer components. Can contain undefined values. */
  drawers: [unknown, unknown];
}

/** Payload types for messages sent from the drawer container. */
export type ContainerPayload = ContentContainerChanged | DrawerContainersChanged;


/** Message sent when a drawer has finished initializing. */
export interface DrawerInitialized {
  /** Message type. */
  type: 'drawer-initialized';
}

/** Message send when the state of a drawer changes. */
export interface DrawerToggled {
  /** Message type. */
  type: 'drawer-toggled';
  /** Whether the drawer is open. */
  opened: boolean;
  /** Whether the drawer is expanded. Implies opened. */
  expanded: boolean;
  /** Width of the drawer. */
  width: number;
  /** Margin used by the drawer for toggle button, etc. */
  margin: number;
}

/** Payload types for messages sent from the drawers. */
export type DrawerPayload = DrawerToggled | DrawerInitialized;


/** Combined payload type for all drawer sub components. */
export type Payload = ContainerPayload | DrawerPayload;
/** Specific message type. */
export type Message = GenericMessage<Payload>;
/** Specific channel type. */
export type MessageChannel = GenericMessageChannel<Payload>;
/** Specific service type. */
export type MessageService = GenericMessageService<Payload>;
/** Reference to the service class. */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessageService = GenericMessageService;
