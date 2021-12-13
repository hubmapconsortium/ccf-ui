import { SpatialSceneNode, SpatialEntity } from 'ccf-database';
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

const SPATIAL_ENTITY_URL = 'http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity';
const FEMALE_SKIN = 'http://purl.org/ccf/latest/ccf.owl#VHFSkin';
const MALE_SKIN = 'http://purl.org/ccf/latest/ccf.owl#VHMSkin';

@Injectable({
  providedIn: 'root'
})
export class FilteredSceneService {
  readonly scene$ = this.source.getScene();
  readonly organs$ = this.configState.getOption('data').pipe(
    map(data => this.selectOrgans(data)),
    shareReplay(1)
  );
  readonly referenceOrgans$ = this.source.getReferenceOrgans();

  readonly filteredScene$ = combineLatest([this.scene$, this.organs$, this.referenceOrgans$]).pipe(
    map(([nodes, organs, referenceOrgans]) => this.filterSceneNodes(nodes, organs, referenceOrgans)),
    shareReplay(1)
  );

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly source: DataSourceService
  ) { }

  private selectOrgans(data: Any[] | undefined): Set<string> {
    const selectOrgan = (item: Any) =>
      item[SPATIAL_ENTITY_URL].placement.target;

    const organs = (data ?? []).map(selectOrgan);
    return new Set(organs);
  }

  private filterSceneNodes(nodes: SpatialSceneNode[], organs: Set<string>, referenceOrgans: SpatialEntity[]): SpatialSceneNode[] {
    const neededReferenceOrgans = referenceOrgans.filter(organ => organs.has(organ.reference_organ ?? ''));
    const neededSkins = this.getNeededSkins(neededReferenceOrgans);
    const neededOrgans = new Set([...organs, ...neededSkins]);
    const filteredNodes = nodes.filter(node => neededOrgans.has(node.reference_organ!));

    return filteredNodes;
  }

  private getNeededSkins(organs: SpatialEntity[]): string[] {
    if (organs.length === 1) {
      return [];
    }

    const skins: string[] = [];
    organs.forEach(organ => {
      if (organ.sex === 'Female') {
        skins.push(FEMALE_SKIN);
      } else if (organ.sex === 'Male') {
        skins.push(MALE_SKIN);
      }
    });

    return skins;
  }
}
