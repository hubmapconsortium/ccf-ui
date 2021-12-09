import { SpatialSceneNode } from 'ccf-database';
import { combineLatest } from 'rxjs';
import { Injectable } from "@angular/core";
import { GlobalConfigState } from 'ccf-shared';
import { DataSourceService } from '../data-source/data-source.service';
import { map, shareReplay } from 'rxjs/operators';
import { Any } from '@angular-ru/common/typings';
import { JsonLdObj } from 'jsonld/jsonld-spec';

interface BodyUIData {
  id: string;
  rui_locations: JsonLdObj;
};

interface GlobalConfig {
  highlightID?: string;
  zoomToID?: string;
  data?: BodyUIData[];
}

@Injectable({
  providedIn: 'root'
})
export class FilteredSceneService {
  readonly scene$ = this.source.getScene();
  readonly organs$ = this.configState.getOption('data').pipe(
    map(data => this.selectOrgans(data)),
    shareReplay(1)
  );

  readonly filteredScene$ = combineLatest([this.scene$, this.organs$]).pipe(
    map(([nodes, organs]) => this.filterSceneNodes(nodes, organs)),
    shareReplay(1)
  );

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly source: DataSourceService
  ) { }

  private selectOrgans(data: Any[] | undefined): Set<string> {
    const selectOrgan = (item: Any) =>
      item['http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity'].placement.target;

    const organs = (data ?? []).map(selectOrgan);
    return new Set(organs);
  }

  private filterSceneNodes(nodes: SpatialSceneNode[], organs: Set<string>): SpatialSceneNode[] {
    return nodes.filter(node => organs.has(node.reference_organ!));
  }
}
