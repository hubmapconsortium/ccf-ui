import { SpatialSceneNode, SpatialEntity, Filter } from 'ccf-database';
import { combineLatest, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { DataSourceService } from '../data-source/data-source.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Any } from '@angular-ru/common/typings';
import {
  FEMALE_SKIN_URL,
  HIGHLIGHT_YELLOW,
  MALE_SKIN_URL,
  SPATIAL_ENTITY_URL,
} from '../../constants';
import { hightlight } from '../../highlight.operator';
import { GlobalConfig } from '../../../app.component';
import { zoomTo } from '../../zoom-to.operator';
import { JsonLdObj } from 'jsonld/jsonld-spec';

@Injectable({
  providedIn: 'root',
})
export class FilteredSceneService {
  readonly data$ = this.configState.getOption('data');
  readonly zoomToID$ = this.configState
    .getOption('zoomToID')
    .pipe(map((id) => `http://purl.org/ccf/1.5/entity/${id}`));
  readonly highlightID$ = this.configState
    .getOption('highlightID')
    .pipe(map((id) => `http://purl.org/ccf/1.5/entity/${id}`));

  readonly referenceOrgans$ = this.source.getReferenceOrgans();

  readonly scene$ = combineLatest([
    this.data$,
    this.referenceOrgans$,
    this.source.dataSource,
  ]).pipe(
    switchMap(([data, referenceOrgans, _]) =>
      this.chooseScene(data, referenceOrgans)
    )
  );

  readonly organs$ = this.configState.getOption('data').pipe(
    map((data) => this.selectOrgans(data)),
    shareReplay(1)
  );

  readonly filteredOrgans$ = combineLatest([
    this.organs$,
    this.referenceOrgans$,
  ]).pipe(
    map(([organs, referenceOrgans]) =>
      this.getNeededReferenceOrgans(referenceOrgans, organs)
    ),
    shareReplay(1)
  );

  readonly filteredScene$ = combineLatest([
    this.scene$,
    this.organs$,
    this.referenceOrgans$,
  ]).pipe(
    map(([nodes, organs, referenceOrgans]) =>
      this.filterSceneNodes(nodes, organs, referenceOrgans)
    ),
    hightlight(this.highlightID$, HIGHLIGHT_YELLOW),
    zoomTo(this.zoomToID$),
    shareReplay(1)
  );

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly source: DataSourceService
  ) {}

  private chooseScene(
    data?: JsonLdObj[],
    organs?: SpatialEntity[]
  ): Observable<SpatialSceneNode[]> {
    const organUrls =
      data?.map((obj) => {
        const block: Any = obj[SPATIAL_ENTITY_URL];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return block?.placement.target;
      }) ?? [];
    const uniqueOrganUrls = new Set(organUrls);

    if (uniqueOrganUrls.size > 1) {
      return this.source.getScene();
    } else if (organs) {
      const organ = organs.find(
        (tempOrgan) => tempOrgan['@id'] === organUrls[0]
      );
      if (organ) {
        return this.source.getOrganScene(
          organ.representation_of as string,
          {
            ontologyTerms: [organ.reference_organ as string],
            sex: organ.sex,
          } as Filter
        );
      }
    }
    return of([]);
  }

  private selectOrgans(data: Any[] | undefined): Set<string> {
    const selectOrgan = (item: Any) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      item[SPATIAL_ENTITY_URL].placement.target;

    const organs = (data ?? []).map(selectOrgan);
    return new Set(organs);
  }

  private filterSceneNodes(
    nodes: SpatialSceneNode[],
    organs: Set<string>,
    referenceOrgans: SpatialEntity[]
  ): SpatialSceneNode[] {
    const neededReferenceOrgans = this.getNeededReferenceOrgans(
      referenceOrgans,
      organs
    );
    const neededSkins = this.getNeededSkins(neededReferenceOrgans);
    const neededOrgans = new Set([...organs, ...neededSkins]);
    const filteredNodes = nodes.filter(
      (node) => !node.reference_organ || neededOrgans.has(node.reference_organ)
    );

    return filteredNodes;
  }

  private getNeededReferenceOrgans(
    referenceOrgans: SpatialEntity[],
    organs: Set<string>
  ): SpatialEntity[] {
    return referenceOrgans.filter((organ) =>
      organs.has(organ.reference_organ ?? '')
    );
  }

  private getNeededSkins(organs: SpatialEntity[]): string[] {
    if (organs.length === 1) {
      return [];
    }

    const skins = new Set<string>();
    organs.forEach((organ) => {
      if (organ.sex === 'Female') {
        skins.add(FEMALE_SKIN_URL);
      } else if (organ.sex === 'Male') {
        skins.add(MALE_SKIN_URL);
      }
    });

    return [...skins];
  }
}
