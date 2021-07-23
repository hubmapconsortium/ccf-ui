/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { createEntityCollections, EntityCollections } from '@angular-ru/common/entity';
import { Injectable } from '@angular/core';
import { Computed, DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { bind as Bind } from 'bind-decorator';
import { combineLatest, Observable, ObservableInput } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../models/anatomical-structure-tag';
import { ModelState } from '../model/model.state';
import { SceneState } from '../scene/scene.state';


/** Tag state model */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnatomicalStructureTagStateModel {
}


/**
 * Tag collection global state
 */
@StateRepository()
@State<EntityCollections<Tag, TagId, AnatomicalStructureTagStateModel>>({
  name: 'tags',
  defaults: {
    ...createEntityCollections()
  }
})
@Injectable()
export class AnatomicalStructureTagState extends NgxsDataEntityCollectionsRepository<Tag, TagId, AnatomicalStructureTagStateModel> {
  /** Observable of tags */
  @Computed()
  get tags$(): Observable<Tag[]> {
    return combineLatest([this.entities$, this.scene.nodeCollisions$]).pipe(
      map(([entities, collisions]) => {
        const tags: Tag[] = [];
        const added = new Set<string>();
        const removed = new Set<string>();
        Object.entries(entities).forEach(([id, tag]) => {
          if (tag.type === 'removed') {
            removed.add(id);
          } else {
            added.add(id);
            tags.push(tag);
          }
        });
        for (const model of collisions) {
          const iri = model.representation_of;
          if (iri && !removed.has(iri) && !added.has(iri)) {
            added.add(iri);
            tags.push({
              id: iri,
              label: model.tooltip as string,
              type: 'assigned'
            });
          }
        }
        return tags;
      }),
      shareReplay(1)
    );
  }

  private _latestTags: Tag[] = [];

  get latestTags(): Tag[] {
    return this._latestTags;
  }

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load page and model state
   */
  constructor(
    private readonly model: ModelState,
    private readonly scene: SceneState,
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    this.tags$.subscribe((tags) => {
      this._latestTags = tags;
    });
  }

  @DataAction()
  addTags(tags: Tag[]): void {
    for (const tag of tags) {
      this.addTagRaw(tag);
    }
  }

  @DataAction()
  addTag(tag: Tag): void {
    this.addTagRaw(tag);
  }

  @DataAction()
  removeTag(tag: Tag): void {
    if (this.snapshot.entities[tag.id]) {
      this.updateEntitiesMany([{id: tag.id, changes: {type: 'removed'}}]);
    } else {
      this.addEntityOne({...tag, type: 'removed'});
    }
  }

  /**
   * Searches for matching tags (not in the state)
   *
   * @param text Search text
   * @param limit Maximum returned results hint
   * @returns external Search result
   */
  @Bind
  searchExternal(text: string, limit: number): ObservableInput<TagSearchResult> {
    const matches = this.model.snapshot.anatomicalStructures
      .filter(as => as.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    return [{
      totalCount: matches.length,
      results: matches.map((as) => ({
        id: as.id,
        label: as.name,
        type: 'added'
      } as Tag)).slice(0, limit)
    }];
  }

  /**
   * Adds a tag. Implementation helper for `addTags` and `addTag`
   *
   * @param tag The tag
   */
  private addTagRaw(tag: Tag): void {
    if (this.snapshot.entities[tag.id]) {
      this.updateEntitiesMany([{id: tag.id, changes: {type: 'added'}}]);
    } else {
      this.addEntityOne({ ...tag, type: 'added'});
    }
  }
}
