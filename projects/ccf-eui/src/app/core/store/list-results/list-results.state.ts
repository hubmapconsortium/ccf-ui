import { Injectable, Injector } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { sortBy } from 'lodash';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, pluck, tap } from 'rxjs/operators';

import { ListResult } from '../../models/list-result';
import { DataSourceService } from '../../services/data-source/data-source.service';
import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';


export interface ListResultsStateModel {
  listResults: ListResult[];
  highlightedNodeId?: string;
}

@StateRepository()
@State<ListResultsStateModel>({
  name: 'listResults',
  defaults: {
    listResults: []
  }
})
@Injectable()
export class ListResultsState extends NgxsImmutableDataRepository<ListResultsStateModel> implements NgxsOnInit {
  /** Scene to display in the 3d Scene */
  readonly listResults$ = this.state$.pipe(pluck('listResults'), distinctUntilChanged());
  readonly highlightedNodeId$ = this.state$.pipe(pluck('highlightedNodeId'), distinctUntilChanged());


  /** The data state */
  private dataState: DataState;

  /** Color assignments state */
  private colorAssignments: ColorAssignmentState;

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load data state
   */
  constructor(
    private readonly dataService: DataSourceService,
    private readonly injector: Injector
  ) {
    super();
  }

  /**
   * Sets the list results
   *
   * @param listResults The list of results to display
   */
  @DataAction()
  setListResults(@Payload('listResults') listResults: ListResult[]): void {
    this.ctx.patchState({ listResults });
  }

  selectListResult(result: ListResult) {
    this.colorAssignments.assignColor(result.tissueBlock.spatialEntityId);
  }

  deselectListResult(result: ListResult) {
    this.colorAssignments.unassignColor(result.tissueBlock.spatialEntityId);
  }

  highlightNode(id: string): void {
    this.ctx.patchState({highlightedNodeId: id});
  }

  unHighlightNode(): void {
    this.ctx.patchState({highlightedNodeId: undefined});
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.dataState = this.injector.get(DataState);
    this.colorAssignments = this.injector.get(ColorAssignmentState);

    combineLatest([
      this.dataState.tissueBlockData$,
      this.colorAssignments.colorAssignments$
    ]).pipe(
      map(([tissueBlocks, colors]) => {
        const topBlocks: ListResult[] = [];
        const otherBlocks: ListResult[] = [];

        for (const tissueBlock of tissueBlocks) {
          const color = colors[tissueBlock.spatialEntityId];
          if (color) {
            topBlocks.push({
              selected: true, color: color.color, tissueBlock, rank: color.rank
            });
          } else {
            otherBlocks.push({
              selected: false, tissueBlock
            });
          }
        }

        return sortBy(topBlocks, ['rank']).concat(otherBlocks);
      }),
      tap(results => this.setListResults(results))
    ).subscribe();
  }
}
