import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { Tag } from '../../../core/models/anatomical-structure-tag';


/**
 * A list of removable tags
 */
@Component({
  selector: 'ccf-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-list';

  /**
   * The tags
   */
  @Input() tags!: Tag[];

  /**
   * Emits when a tag is removed
   */
  @Output() readonly tagRemoved = new EventEmitter<Tag>();

  /**
   * Emits the new array of tags when a tag has been removed
   */
  @Output() readonly tagsChange = new EventEmitter<Tag[]>();

  /**
   * Creates an instance of tag list component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Gets the unique identifier for a tag
   *
   * @param _index Unused
   * @param tag A tag
   * @returns An identifier
   */
  tagId(_index: number, tag: Tag): unknown {
    return tag.id;
  }

  tagClasses(tag: Tag): string[] {
    return tag.type === 'added' ? ['added'] : ['assigned'];
  }

  /**
   * Removes a tag from the list
   *
   * @param tag Tag to remove
   */
  removeTag(tag: Tag): void {
    this.tags = this.tags.filter(obj => obj !== tag);
    this.ga.event('tag_removed', 'tag_list', tag.label);
    this.tagRemoved.emit(tag);
    this.tagsChange.emit(this.tags);
  }
}
