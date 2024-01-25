import { map, startWith } from 'rxjs/operators';
import { SpatialSceneNode } from 'ccf-database';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';

function setZoomToIfMatching(
  entity: SpatialSceneNode,
  id: string | undefined
): SpatialSceneNode {
  return entity.entityId !== id ? entity : { ...entity, zoomToOnLoad: true };
}

export function zoomTo(
  id: Observable<string | undefined>
): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return (source) =>
    combineLatest([source, idWithInitalValue]).pipe(
      map(([entities, iD]) =>
        entities.map((entity) => setZoomToIfMatching(entity, iD))
      )
    );
}
