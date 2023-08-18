import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Inject, InjectionToken, Input, Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { bind as Bind } from 'bind-decorator';
import { lastValueFrom, from, Observable, ObservableInput } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take } from 'rxjs/operators';

import { DecoratedRange } from '../decorated-text/decorated-range';


/** A single suggestion to show in autocomplete  */
export interface AutoCompleteOption {
  /** A unique id */
  id: unknown;
  /** The displayed label */
  label: string;
  /** Optional styling of the label */
  decorations?: Partial<DecoratedRange>[];
}

/**
 * Token to provide a default for the maximum number of
 * autocomplete suggestions to show at the same time.
 */
export const DEFAULT_MAX_OPTIONS = new InjectionToken(
  'Maximum number of autocomplete options displayed',
  {
    providedIn: 'root',
    factory(): number {
      return 10;
    }
  }
);


/**
 * A text search bar with optional autocompletion functionality.
 */
@Component({
  selector: 'ccf-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSearchComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-text-search';

  /**
   * Placeholder text for the search bar
   */
  @Input() placeholder = 'Search...';

  /**
   * The text to show on the search bar
   */
  @Input()
  get value(): string {
    return this.controller.value as string;
  }

  set value(val: string) {
    this.controller.setValue(val, { emitEvent: false });
  }

  /**
   * Maximum number of autocomplete suggestions to show simultaneously
   */
  @Input() maxOptions?: number;

  /**
   * Function providing the autocomplete suggestions.
   * Receives the latest search bar text and the maximum of suggestions to provide.
   */
  @Input() autoCompleter?: (search: string, max: number) => ObservableInput<AutoCompleteOption[]>;

  /**
   * Emits when the search bar text changes
   */
  @Output() readonly valueChange: Observable<string>;

  /**
   * Emits when an autocomplete option has been selected
   */
  @Output() readonly optionSelected = new EventEmitter<AutoCompleteOption>();

  /**
   * Form controller for search bar
   */
  readonly controller = new UntypedFormControl();

  /**
   * Emits the latest autocomplete suggestions
   */
  readonly options = (this.controller.valueChanges as Observable<string>).pipe(
    startWith(''),
    distinctUntilChanged(),
    switchMap(this.getOptions)
  );

  /**
   * Creates an instance of text search component.
   *
   * @param defaultMaxOptions The default value for `maxOptions`
   */
  constructor(
    @Inject(DEFAULT_MAX_OPTIONS) private readonly defaultMaxOptions: number
  ) {
    this.valueChange = this.controller.valueChanges;
  }

  /**
   * Fetches the latest autocomplete suggestions for the provided search text.
   *
   * @param search The search text to find suggestions for
   * @returns The found suggestions
   */
  @Bind
  private async getOptions(search: string): Promise<AutoCompleteOption[]> {
    const { autoCompleter, maxOptions = this.defaultMaxOptions } = this;
    if (!autoCompleter || maxOptions < 1) {
      return [];
    }

    const options = autoCompleter(search, maxOptions);
    return lastValueFrom(from(options).pipe(
      take(1),
      map(array => array.length <= maxOptions ? array : array.slice(0, maxOptions))
    ));
  }

  /**
   * Text to show in search bar when an autocomplete option is selected.
   *
   * @param option The autocomplete option
   * @returns The displayed text
   */
  optionDisplay(option: AutoCompleteOption | null): string {
    return option?.label ?? '';
  }

  /**
   * Gets an unique identifier for an autocomplete option object.
   *
   * @param _index Unused
   * @param option The option object
   * @returns The unique identifier
   */
  optionId(_index: number, option: AutoCompleteOption): unknown {
    return option.id;
  }
}
