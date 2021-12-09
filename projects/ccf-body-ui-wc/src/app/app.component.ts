import { FilteredSceneService } from './core/services/filtered-scene/filtered-scene.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { Observable, combineLatest } from 'rxjs';
import { DataSourceService } from './core/services/data-source/data-source.service';
import { Filter, SpatialSceneNode } from 'ccf-database';
import { map, take } from 'rxjs/operators';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { Any } from '@angular-ru/common/typings';

interface BodyUIData {
  id: string;
  rui_locations: JsonLdObj;
};

interface GlobalConfig {
  highlightID?: string;
  zoomToID?: string;
  data?: BodyUIData[];
}

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly data$ = this.configState.getOption('data');
  readonly highlightID$ = this.configState.getOption('highlightID');
  readonly zoomToID$ = this.configState.getOption('zoomToID');

  scene$ = this.sceneSource.filteredScene$;

  @Output() readonly onHover = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly sceneSource: FilteredSceneService
  ) { }

  async testScene(): Promise<void> {
    console.log('Scene: ', this.scene$.pipe(take(1)).toPromise());
    const data = await this.data$.pipe(take(1)).toPromise();
    if (!data) {
      return;
    }
    console.log('Data: ', data);
    console.log('getNeededOrgans: ', this.getNeededOrgans(data));
  }

  getNeededOrgans(bodyData: Any[]): string[] {
    if (!bodyData) {
      return [];
    }

    const allOrgans: string[] = bodyData.map((data) => {
      return data['http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity'].placement.target;
    });
    const uniqueOrgans = [...new Set(allOrgans)] as string[];
    return uniqueOrgans;
  }
}
