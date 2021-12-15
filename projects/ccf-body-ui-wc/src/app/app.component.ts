import { FilteredSceneService } from './core/services/filtered-scene/filtered-scene.service';
import { Component, EventEmitter, Output, ViewChild, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BodyUiComponent, GlobalConfigState } from 'ccf-shared';
import { map, take } from 'rxjs/operators';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { findHighlightId, hightlight } from './core/highlight.operator';
import { SPATIAL_ENTITY_URL } from './core/constants';

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
export class AppComponent implements OnInit {
  @ViewChild('bodyUI', { static: true }) readonly bodyUI!: BodyUiComponent;

  readonly data$ = this.configState.getOption('data');
  readonly highlightID$ = this.configState.getOption('highlightID').pipe(
    map(id => `http://purl.org/ccf/1.5/entity/${id}`),
    findHighlightId(this.data$),
  );
  readonly zoomToID$ = this.configState.getOption('zoomToID');

  scene$ = this.sceneSource.filteredScene$.pipe(
    hightlight(this.highlightID$, [173, 255, 47, 229.5])
  );
  organs$ = this.sceneSource.filteredOrgans$;

  @Output() readonly onMouseEnter = new EventEmitter<string>();
  @Output() readonly onMouseLeave = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly sceneSource: FilteredSceneService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bodyUI && 'organ' in changes) {
      this.reset();
    }
  }

  private async reset(): Promise<void> {
    const { bodyUI } = this;
    const { data = [], zoomToID, highlightID } = this.configState.snapshot;
    const organs = data as unknown as BodyUIData[];

    bodyUI.rotation = bodyUI.rotationX = 0;

    console.log('organs, reset: ', organs);
    console.log('zoomToID: ', zoomToID);

    if (organs.length < 2) {
      this.focusSingleOrgan(organs[0]);
    } else if (zoomToID) {
      const zoomToOrgan = organs.find((organ) => organ.id === zoomToID);
      this.focusSingleOrgan(zoomToOrgan);
    } else {
      this.focusMultipleOrgans(organs);
    }
  }

  focusSingleOrgan(organ: BodyUIData | undefined): void {
    if (!organ) {
      return;
    }
    console.log('focusSingleOrgan: ', organ);

    const { bodyUI } = this;
    const { x_dimension: x, y_dimension: y, z_dimension: z } = organ[SPATIAL_ENTITY_URL];
    bodyUI.bounds = { x: 1.25 * x / 1000, y: 1.25 * y / 1000, z: 1.25 * z / 1000 };
    bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
    console.log('bodyUI.bounds: ', bodyUI.bounds);
    console.log('bodyUI.target: ', bodyUI.target);

    this.cdr.detectChanges();
  }

  focusMultipleOrgans(organs: BodyUIData[] | undefined): void {
    if (!organs) {
      return;
    }
    console.log('focusMultipleOrgans: ', organs);

    let { x_dimension: x, y_dimension: y, z_dimension: z } = organs[0][SPATIAL_ENTITY_URL];
    organs.forEach(entity => {
      const organ = entity[SPATIAL_ENTITY_URL];
      if (organ.x_dimension > x) {
        x = organ.x_dimension;
      }

      if (organ.y_dimension > y) {
        y = organ.y_dimension;
      }

      if (organ.z_dimension > z) {
        z = organ.z_dimension;
      }
    });

    const { bodyUI } = this;
    bodyUI.bounds = { x: 1.25 * x / 1000, y: 1.25 * y / 1000, z: 1.25 * z / 1000 };
    bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
    console.log('bodyUI.bounds: ', bodyUI.bounds);
    console.log('bodyUI.target: ', bodyUI.target);
    console.log('bodyUI', bodyUI);

    this.cdr.detectChanges();
  }

  async testScene(): Promise<void> {
    const { bodyUI } = this;
    console.log('this: ', this);
    console.log('organs: ', this.organs$.pipe(take(1)).toPromise());
    console.log('Scene: ', this.scene$.pipe(take(1)).toPromise());
    const data = await this.data$.pipe(take(1)).toPromise();
    console.log('bodyUI: ', bodyUI);
    if (!data) {
      return;
    }
    console.log('Data: ', data);
  }
}
