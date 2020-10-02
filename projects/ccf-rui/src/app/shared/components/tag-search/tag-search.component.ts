import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { bind as Bind } from 'bind-decorator';
import { Observable, ObservableInput } from 'rxjs';
import { map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../../core/models/anatomical-structure-tag';


/** Default search results limit */
const DEFAULT_SEARCH_LIMIT = 5;
/** Initial selection for mat-select */
const EMPTY_SELECTION = ['search'];
/** Empty search result object */
const EMPTY_RESULT: TagSearchResult = { totalCount: 0, results: [] };

/**
 * Component for searching, selecting, and adding tags.
 */
@Component({
  selector: 'ccf-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagSearchComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-search';

  /** Placeholder text */
  @Input() placeholder = 'Add Anatomical Structures ...';

  /** Search method */
  @Input() search: (text: string, limit: number) => ObservableInput<TagSearchResult>;

  /** Maximum number of results to show */
  @Input() searchLimit?: number;

  /** Emits when tags are added */
  @Output() readonly added = new EventEmitter<Tag[]>();

  /** Mapping for pluralizing the result total count */
  readonly countMapping = {
    '=0': '0 results',
    '=1': '1 result',
    other: '# results'
  };

  readonly formGroup = this.fb.group({
    select: [[...EMPTY_SELECTION]],
    search: ['']
  });

  /** Controller for the select element */
  get selectController(): AbstractControl {
    return this.formGroup.get('select') as AbstractControl;
  }

  /** Controller for the search element */
  get searchController(): AbstractControl {
    return this.formGroup.get('search') as AbstractControl;
  }

  /** Current search result */
  readonly searchResult$ =
    (this.searchController.valueChanges as Observable<string | undefined>).pipe(
      startWith(''),
      switchMap(this.doSearch),
      map(this.limitSearchResult),
      shareReplay(1)
    );

  /** Current result total count */
  readonly totalCount$ = this.searchResult$.pipe(pluck('totalCount'));

  /** Current results */
  readonly results$ = this.searchResult$.pipe(pluck('results'));

  /**
   * Creates an instance of tag search component.
   *
   * @param fb Form builder helper service
   */
  constructor(private readonly fb: FormBuilder) {}

  /**
   * Extracts the tag identifier
   *
   * @param _index Unused
   * @param tag A tag
   * @returns The identifier corresponding to the tag
   */
  tagId(_index: number, tag: Tag): TagId {
    return tag.id;
  }

  /**
   * Adds currently selected tags and clears the search.
   * Does nothing if no tags have been selected.
   *
   * @param searchEl Used to refocus on the input element after clearing the search
   */
  emitTagsAndClear(searchEl: { focus(): void }): void {
    const { added, selectController, searchController } = this;
    const selection = selectController.value as [string, ...Tag[]];
    const tags = selection.slice(1) as Tag[]; // Remove initial 'search' value

    if (tags.length > 0) {
      searchController.setValue('');
      searchEl.focus();
      added.emit(tags);
    }
  }

  /**
   * Performs a text search
   *
   * @param text The search text
   */
  @Bind
  private doSearch(text: string | undefined): ObservableInput<TagSearchResult> {
    if (!text) {
      return [EMPTY_RESULT];
    }

    const { search, searchLimit = DEFAULT_SEARCH_LIMIT } = this;
    const result = search?.(text, searchLimit);
    return result ?? [EMPTY_RESULT];
  }

  /**
   * Limits the number of items in a search
   *
   * @param search The search result object
   * @returns A possible modified object with search limits applied
   */
  @Bind
  private limitSearchResult(search: TagSearchResult): TagSearchResult {
    const { searchLimit = DEFAULT_SEARCH_LIMIT } = this;

    if (search.results.length > searchLimit) {
      return { ...search, results: search.results.slice(0, searchLimit) };
    }
    return search;
  }
}
