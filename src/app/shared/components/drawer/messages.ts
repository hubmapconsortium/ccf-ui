import {
  Message as GenericMessage, MessageChannel as GenericMessageChannel, MessageService as GenericMessageService,
} from '../../services/message/message.service';


// Container payloads
export interface ContentContainerChanged {
  type: 'content-container-changed';
  content: unknown;
}

export interface DrawerContainersChanged {
  type: 'drawer-containers-changed';
  drawers: [unknown, unknown];
}

export type ContainerPayload = ContentContainerChanged | DrawerContainersChanged;


// Drawer payloads
export interface DrawerInitialized {
  type: 'drawer-initialized';
}

export interface DrawerToggled {
  type: 'drawer-toggled';
  opened: boolean;
  expanded: boolean;
  width: number;
  margin: number;
}

export type DrawerPayload = DrawerToggled | DrawerInitialized;


export type Payload = ContainerPayload | DrawerPayload;
export type Message = GenericMessage<Payload>;
export type MessageChannel = GenericMessageChannel<Payload>;
export type MessageService = GenericMessageService<Payload>;
export const MessageService = GenericMessageService; // tslint:disable-line: variable-name
