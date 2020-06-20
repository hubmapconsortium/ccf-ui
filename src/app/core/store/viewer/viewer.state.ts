import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { EntityUpdate, NgxsEntityCollections } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { DEFAULT_COLOR_SCHEMES } from '../../../modules/color-scheme/color-schemes';
import { ColorScheme } from '../../models/color-scheme';
import { ImageViewerLayer, PureImageViewerLayer } from '../../models/image-viewer-layer';


const NUM_LAYERS_SELECTED_ON_CREATION = 3;
const IMAGE_VIEWER_LAYER_DEFAULTS = {
  brightness: [2, 31] as [number, number],
  transparency: 100,
  customizedColor: false,
  defaultOrder: -1
};

export interface ViewerStateModel extends NgxsEntityCollections<PureImageViewerLayer> {
  defaultScheme: ColorScheme;
  autoColorIndex: number;
  selectionCounter: number;
}

@StateRepository()
@State<ViewerStateModel>({
  name: 'viewer',
  defaults: {
    ...createEntityCollections(),
    defaultScheme: DEFAULT_COLOR_SCHEMES[0],
    autoColorIndex: 0,
    selectionCounter: 0
  }
})
@Injectable()
export class ViewerState extends NgxsDataEntityCollectionsRepository<PureImageViewerLayer, string, ViewerStateModel> {
  readonly layers$ = this.entities$.pipe(
    map(entities => Object.values(entities)),
    map(layers => layers.map(layer => new ImageViewerLayer(layer)))
  );
  readonly activeLayers$ = this.layers$.pipe(
    map(layers => layers.filter(layer => layer.selected))
  );

  @DataAction()
  createLayers(ids: string[]): void {
    const maxSelected = NUM_LAYERS_SELECTED_ON_CREATION;
    const { defaultScheme } = this.snapshot;
    const length = ids.length;

    this.removeEntitiesMany(this.ids);
    this.addEntitiesMany(ids.map((id, index) => ({
      id,
      label: id,
      colorScheme: defaultScheme,
      color: index < maxSelected ? this.getAutoColor(index) : defaultScheme.colors[0],
      selected: index < maxSelected,
      selectionOrder: index,
      ...IMAGE_VIEWER_LAYER_DEFAULTS
    })));
    this.ctx.patchState({
      autoColorIndex: Math.min(length, maxSelected),
      selectionCounter: length
    });
  }

  @DataAction()
  updateLayer(id: string, changes: Partial<PureImageViewerLayer>): void {
    const { autoColorIndex, selectionCounter } = this.snapshot;
    const layer = this.entities[id];
    let color = changes.color || layer.color;
    let defaultOrder = layer.defaultOrder;
    if (!layer.customizedColor && !changes.customizedColor &&
        changes.selected && layer.defaultOrder === -1) {
      color = this.getAutoColor(autoColorIndex);
      defaultOrder = autoColorIndex;
      this.ctx.patchState({ autoColorIndex: autoColorIndex + 1 });
    }

    this.updateEntitiesMany([{
      id,
      changes: {
        ...changes,
        color,
        selectionOrder: selectionCounter,
        defaultOrder
      }
    }]);
    this.ctx.patchState({ selectionCounter: selectionCounter + 1 });
  }

  @DataAction()
  setDefaultScheme(scheme: ColorScheme): void {
    const { entities } = this;
    const changes: EntityUpdate<PureImageViewerLayer, string>[] = [];
    for (const [id, layer] of Object.entries(entities)) {
      if (!layer.customizedColor) {
        const index = layer.colorScheme.colors.indexOf(layer.color);
        changes.push({
          id,
          changes: {
            colorScheme: scheme,
            color: scheme.colors[index]
          }
        });
      }
    }

    this.updateEntitiesMany(changes);
    this.ctx.patchState({ defaultScheme: scheme });
  }

  private getAutoColor(index: number): string {
    const { defaultScheme: { colors } } = this.snapshot;
    const order = [0, 6, 3, 1, 5, 2, 4];
    return colors[order[index % order.length]];
  }
}
