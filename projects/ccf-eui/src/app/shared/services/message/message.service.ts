import { Inject, Injectable, InjectionToken, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { filter, mergeAll, takeWhile } from 'rxjs/operators';


/**
 * Message service configuration options.
 */
export interface MessageServiceConfig {
  /** Whether to listen to parent messages. */
  isolated: boolean;
}

/**
 * A message sent on a channel.
 *
 * @template T The payload type.
 */
export interface Message<T> {
  /** Unique identifier for a message. */
  id: number;
  /** Sender of the message. */
  source: unknown;
  /** Data associated with this message. */
  payload: T;
}

/** Default message service configuration. */
export const MESSAGE_SERVICE_DEFAULT_CONFIG: MessageServiceConfig = {
  isolated: true
};

/** Token for specifying the message service configuration. */
export const MESSAGE_SERVICE_CONFIG = new InjectionToken<MessageServiceConfig>(
  'Message service configuration',
  {
    providedIn: 'root',
    factory: () => MESSAGE_SERVICE_DEFAULT_CONFIG
  }
);


/**
 * Channel for sending and receiving messages.
 *
 * @template T The payload type.
 */
export class MessageChannel<T> {
  /** Counter used to give each message a unique id. */
  private static counter = 0;

  /**
   * Creates a new channel.
   *
   * @param source The message source.
   * @param channel The message send subject.
   * @param messages The message receive observable.
   */
  constructor(
    readonly source: unknown,
    private channel: Subject<Message<T>>,
    private messages: Observable<Message<T>>
  ) { }

  /**
   * Sends a single message with a payload.
   *
   * @param payload The message payload.
   */
  sendMessage(payload: T): void {
    this.channel.next({
      id: this.nextMessageId(),
      source: this.source,
      payload
    });
  }

  /**
   * Gets an observable emitting all messages except for those sent by this source.
   *
   * @returns The message observable.
   */
  getMessages(): Observable<Message<T>> {
    return this.messages.pipe(filter(msg => msg.source !== this.source));
  }

  /**
   * Gets an observable emitting messages sent from a specific source.
   *
   * @param source The source messages are filtered on.
   * @returns The message observable.
   */
  getMessagesFromSource(source: unknown): Observable<Message<T>> {
    return this.getMessages().pipe(filter(msg => msg.source === source));
  }

  /**
   * Gets an observable emitting messages sent from any of the specified sources.
   *
   * @param sources The sources messages are filtered on.
   * @returns The message observable.
   */
  getMessagesFromSources(sources: unknown[]): Observable<Message<T>> {
    return this.getMessages().pipe(filter(msg => sources.includes(msg.source)));
  }

  /**
   * Creates a unique message identifier.
   *
   * @returns The identifier number.
   */
  private nextMessageId(): number {
    return MessageChannel.counter++;
  }
}


/**
 * Service for creating message channels.
 *
 * @template T The message payload type.
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService<T> implements OnDestroy {
  /** The message channel. */
  private channel = new Subject<Message<T>>();
  /** The message listener. */
  private messages: Observable<Message<T>>;

  /**
   * Creates an instance of message service.
   *
   * @param [config] The configuration for this service.
   * @param [parent] The parent message service, if any.
   */
  constructor(@Inject(MESSAGE_SERVICE_CONFIG) readonly config: MessageServiceConfig,
              @Optional() @SkipSelf() readonly parent: MessageService<T> | null) {
    if (config.isolated || !parent) {
      this.messages = this.channel.asObservable();
    } else {
      this.messages = from([
        this.channel,
        parent.messages.pipe(takeWhile(() => !this.channel.closed))
      ]).pipe(mergeAll());
    }
  }

  /**
   * Clean up.
   */
  ngOnDestroy(): void {
    this.channel.complete();
  }

  /**
   * Connects to a message channel.
   *
   * @param source The source of messages sent.
   * @returns A new connected message channel.
   */
  connect(source: unknown): MessageChannel<T> {
    return new MessageChannel(source, this.channel, this.messages);
  }
}
