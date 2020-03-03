import { Inject, Injectable, InjectionToken, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { filter, mergeAll, takeWhile } from 'rxjs/operators';


export interface MessageServiceConfig {
  isolated: boolean;
}

export interface Message<T> {
  id: number;
  source: unknown;
  payload: T;
}

export const MESSAGE_SERVICE_DEFAULT_CONFIG: MessageServiceConfig = {
  isolated: true
};
export const MESSAGE_SERVICE_CONFIG = new InjectionToken<MessageServiceConfig>(
  'Message service configuration',
  {
    providedIn: 'root',
    factory: () => MESSAGE_SERVICE_DEFAULT_CONFIG
  }
);


export class MessageChannel<T> {
  private static counter = 0;

  constructor(
    readonly source: unknown,
    private channel: Subject<Message<T>>,
    private messages: Observable<Message<T>>
  ) { }

  sendMessage(payload: T): void {
    this.channel.next({
      id: this.nextMessageId(),
      source: this.source,
      payload
    });
  }

  getMessages(): Observable<Message<T>> {
    return this.messages.pipe(filter(msg => msg.source !== this.source));
  }

  getMessagesFromSource(source: unknown): Observable<Message<T>> {
    return this.getMessages().pipe(filter(msg => msg.source === source));
  }

  getMessagesFromSources(sources: unknown[]): Observable<Message<T>> {
    return this.getMessages().pipe(filter(msg => sources.includes(msg.source)));
  }

  private nextMessageId(): number {
    return MessageChannel.counter++;
  }
}


@Injectable({
  providedIn: 'root'
})
export class MessageService<T> implements OnDestroy {
  private channel = new Subject<Message<T>>();
  private messages: Observable<Message<T>>;

  constructor(@Optional() @SkipSelf() readonly parent?: MessageService<T>,
              @Inject(MESSAGE_SERVICE_CONFIG) readonly config: MessageServiceConfig
                = MESSAGE_SERVICE_DEFAULT_CONFIG) {
    if (config.isolated || !parent) {
      this.messages = this.channel.asObservable();
    } else {
      this.messages = from([
        this.channel,
        parent.messages.pipe(takeWhile(() => !this.channel.closed))
      ]).pipe(mergeAll());
    }
  }

  ngOnDestroy(): void {
    this.channel.complete();
  }

  connect(source: unknown): MessageChannel<T> {
    return new MessageChannel(source, this.channel, this.messages);
  }
}
