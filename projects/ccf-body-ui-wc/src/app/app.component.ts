import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { Observable } from 'rxjs';
import { DataSourceService } from './core/services/data-source/data-source.service';
import { SpatialSceneNode } from 'ccf-database';
import { take } from 'rxjs/operators';
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

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly data$ = this.configState.getOption('data');
  readonly highlightID$ = this.configState.getOption('highlightID');
  readonly zoomToID$ = this.configState.getOption('zoomToID');

  scene$: Observable<SpatialSceneNode[]>;

  @Output() readonly onHover = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly source: DataSourceService
  ) {
    this.scene$ = source.getScene();
  }

  async testScene(): Promise<void> {
    console.log('Scene: ', this.scene$.pipe(take(1)).toPromise());
    const data = await this.data$.pipe(take(1)).toPromise();
    if (!data) {
      return;
    }
    console.log('Data: ', data);
    console.log('Needed Organs: ', this.neededOrgans(data));
  }

  neededOrgans(bodyData: any[]): string[] {
    console.log('bodyData: ', bodyData);
    return [];
    return bodyData!.map((data) => {
      return data!.rui_locations!.placement!.target;
    });
  }
}
