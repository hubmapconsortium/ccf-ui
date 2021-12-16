import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { SpatialSceneNode } from 'ccf-database';
import { combineLatest, MonoTypeOperatorFunction, Observable } from "rxjs";
import { SPATIAL_ENTITY_URL } from './constants';


export type Color = [number, number, number, number];

function highlightIfMatching(entity: SpatialSceneNode, id: string | undefined, color: Color): SpatialSceneNode {
  return entity['@id'] !== id ? entity : {...entity, color};
}

export function findHighlightId(data$: Observable<any[] | undefined>): MonoTypeOperatorFunction<string | undefined> {
  return source => source.pipe(
    withLatestFrom(data$),
    map(([id, data]) => {
      if (!data || !id) {
        return undefined;
      }

      const item = data.find(d => d['@id'] === id);
      if (!item) {
        return undefined;
      }

      return item[SPATIAL_ENTITY_URL].placement.target;
    })
  );
}


export function hightlight(id: Observable<string | undefined>, color: Color): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return source => combineLatest([source, idWithInitalValue]).pipe(
    map(([entities, id]) =>
      entities.map(entity =>
        highlightIfMatching(entity, id, color)
      )
    )
  )
}
