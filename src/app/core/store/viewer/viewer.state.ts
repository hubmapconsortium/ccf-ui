import { Injectable } from '@angular/core';
import { DataAction, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { NgxsEntityCollections, EntityUpdate } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { DEFAULT_COLOR_SCHEMES } from 'src/app/modules/color-scheme/color-schemes';

import { ColorScheme } from '../../models/color-scheme';
import { ImageViewerLayer, PureImageViewerLayer } from '../../models/image-viewer-layer';


const NUM_LAYERS_SELECTED_ON_CREATION = 3;
const IMAGE_VIEWER_LAYER_DEFAULTS = {
  brightness: [2, 31] as [number, number],
  transparency: 100,
  customizedColor: false,
  defaultOrder: -1
};

let monotoneIncCounter = 0;

export interface ViewerStateModel extends NgxsEntityCollections<PureImageViewerLayer> {
  defaultScheme: ColorScheme;
}

@StateRepository()
@State<ViewerStateModel>({
  name: 'viewer',
  defaults: {
    ...createEntityCollections(),
    defaultScheme: DEFAULT_COLOR_SCHEMES[0]
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
    const { defaultScheme } = this.ctx.getState();
    this.removeEntitiesMany(this.ids);
    this.addEntitiesMany(ids.map((id, index) => ({
      id,
      label: id,
      colorScheme: defaultScheme,
      color: defaultScheme.colors[0],
      selected: index < NUM_LAYERS_SELECTED_ON_CREATION,
      selectionOrder: monotoneIncCounter++,
      ...IMAGE_VIEWER_LAYER_DEFAULTS
    })));
  }

  @DataAction()
  updateLayer(id: string, changes: Partial<PureImageViewerLayer>): void {
    const old = this.entities[id];
    // TODO
    this.updateEntitiesMany([{
      id,
      changes: {
        ...changes,
        selectionOrder: monotoneIncCounter++
      }
    }]);
  }

  @DataAction()
  setDefaultScheme(scheme: ColorScheme): void {
    if (scheme === this.snapshot.defaultScheme) {
      return;
    }

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
}
