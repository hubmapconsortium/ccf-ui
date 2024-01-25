import { map, startWith } from 'rxjs/operators';
import { SpatialSceneNode } from 'ccf-database';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';

export type Color = [number, number, number, number];

function highlightIfMatching(
  entity: SpatialSceneNode,
  id: string | undefined,
  color: Color
): SpatialSceneNode {
  return entity.entityId !== id ? entity : { ...entity, color };
}

export function hightlight(
  id: Observable<string | undefined>,
  color: Color
): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return (source) =>
    combineLatest([source, idWithInitalValue]).pipe(
      map(([entities, iD]) =>
        entities.map((entity) => highlightIfMatching(entity, iD, color))
      )
    );
}
