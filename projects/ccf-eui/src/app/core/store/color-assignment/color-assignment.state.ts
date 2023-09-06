/* eslint-disable @typescript-eslint/member-ordering */
import { Immutable } from '@angular-ru/common/typings/immutability';
import { Injectable } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { State } from '@ngxs/store';
import hexRgb from 'hex-rgb';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';


export interface Color {
  color: string;
  rgba: [number, number, number, number];
  rank: number;
}

export const DEFAULT_COLOR_PALETTE: Color[] = [
  '#FF8800',
  '#2979ff',
  '#ffd740',
  '#b92dff',
  '#da326f',
  '#7323e2',
  '#acf32b',
  '#82B1FF',
  '#E040FB',
  '#00E5FF'
].map((color, rank) => {
  const rgba = hexRgb(color, { format: 'array' });
  rgba[3] = 255; // for Deck.gl
  return { color, rgba, rank };
});

export interface ColorAssignmentStateModel {
  colorPalette: Color[];
  colorsAvailable: Color[];
  colorAssignments: Record<string, Color>;
  colorAssignmentsList: { color: Color; key: string }[];
}

/**
 * Color Assignment State
 */
@StateRepository()
@State<ColorAssignmentStateModel>({
  name: 'colors',
  defaults: {
    colorPalette: DEFAULT_COLOR_PALETTE.concat(),
    colorsAvailable: DEFAULT_COLOR_PALETTE.concat(),
    colorAssignments: {},
    colorAssignmentsList: []
  }
})
@Injectable()
export class ColorAssignmentState extends NgxsImmutableDataRepository<ColorAssignmentStateModel> {
  private readonly forcedUnassignment = new Subject<void>();

  readonly forcedUnassignment$ = this.forcedUnassignment.asObservable();
  readonly colorAssignments$ = this.state$.pipe(map(x => x?.colorAssignments), distinctUntilChanged());
  readonly colorAssignmentsList$ = this.state$.pipe(map(x => x?.colorAssignmentsList), distinctUntilChanged());

  getColor(key: string): Immutable<Color> | undefined {
    const { colorAssignments } = this.snapshot;
    return colorAssignments[key];
  }

  @DataAction()
  assignColor(@Payload('key') key: string, @Payload('doReset') doReset = false): Immutable<Color> {
    let { colorAssignments, colorAssignmentsList, colorsAvailable } = this.snapshot;
    if (doReset) {
      colorsAvailable = this.snapshot.colorPalette.concat();
      colorAssignmentsList = [];
      colorAssignments = {};
    }
    let color = colorAssignments[key];
    if (!color) {
      if (colorsAvailable.length > 0) {
        color = colorsAvailable[0];
      } else {
        color = colorAssignmentsList[colorAssignmentsList.length - 1].color;
        colorAssignmentsList = colorAssignmentsList.slice(0, -1);
        this.forcedUnassignment.next();
      }
      colorsAvailable = colorsAvailable.filter(c => c.color !== color.color);
      colorAssignmentsList = [{ color, key }].concat(colorAssignmentsList);
      colorAssignments = colorAssignmentsList.reduce<Record<string, Immutable<Color>>>((acc, item, rank) => {
        acc[item.key] = { ...item.color, rank };
        return acc;
      }, {});

      this.ctx.patchState({
        colorsAvailable,
        colorAssignments,
        colorAssignmentsList
      });
    }
    return color;
  }

  @DataAction()
  unassignColor(@Payload('key') key: string): void {
    let { colorAssignments, colorAssignmentsList, colorsAvailable } = this.snapshot;
    const color = colorAssignments[key];
    if (color) {
      colorsAvailable = [color].concat(colorsAvailable);
      colorAssignmentsList = colorAssignmentsList.filter(a => a.color.color !== color.color);
      colorAssignments = colorAssignmentsList.reduce<Record<string, Immutable<Color>>>((acc, item, rank) => {
        acc[item.key] = { ...item.color, rank };
        return acc;
      }, {});

      this.ctx.patchState({
        colorsAvailable,
        colorAssignments,
        colorAssignmentsList
      });
    }
  }
}
