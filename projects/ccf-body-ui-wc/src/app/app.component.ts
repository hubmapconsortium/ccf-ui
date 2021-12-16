import { FilteredSceneService } from './core/services/filtered-scene/filtered-scene.service';
import { Component, EventEmitter, Output, ViewChild, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BodyUiComponent, GlobalConfigState } from 'ccf-shared';
import { map, take } from 'rxjs/operators';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { findHighlightId, hightlight } from './core/highlight.operator';
import { HIGHLIGHT_YELLOW, SPATIAL_ENTITY_URL } from './core/constants';

interface BodyUIData {
  id: string;
  rui_locations: JsonLdObj;
};

interface GlobalConfig {
  highlightID?: string;
  zoomToID?: string;
  data?: BodyUIData[];
}

interface Coords3D {
  x: number;
  y: number;
  z: number;
}

//  TODO: Remove console logs.

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
    hightlight(this.highlightID$, HIGHLIGHT_YELLOW)
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

    const { bodyUI } = this;
    bodyUI.bounds = this.findOrgansBounds([organ]);
    const organCoords: [number, number, number] = [
      organ[SPATIAL_ENTITY_URL].placement.x_translation,
      organ[SPATIAL_ENTITY_URL].placement.y_translation,
      organ[SPATIAL_ENTITY_URL].placement.z_translation
    ];
    bodyUI.target = organCoords;

    this.cdr.detectChanges();
  }

  focusMultipleOrgans(organs: BodyUIData[] | undefined): void {
    if (!organs) {
      return;
    }

    const { bodyUI } = this;
    const bounds = this.findOrgansBounds(organs);
    bodyUI.bounds = bounds;

    const organCoords: Coords3D[] = organs.map(organ => {
      return {
        x: organ[SPATIAL_ENTITY_URL].placement.x_translation,
        y: organ[SPATIAL_ENTITY_URL].placement.y_translation,
        z: organ[SPATIAL_ENTITY_URL].placement.z_translation
      }
    });
    const organMidPoint: [number, number, number] = this.findMidPoint(organCoords);
    bodyUI.target = organMidPoint;

    this.cdr.detectChanges();
  }

  findOrgansBounds(organs: BodyUIData[]): { x: number, y: number, z: number } {
    let x = 0;
    let y = 0;
    let z = 0;

    organs.forEach(entity => {
      const organ = entity[SPATIAL_ENTITY_URL];

      const tempX = organ.placement.x_translation + (organ.x_dimension / 2);
      const tempY = organ.placement.y_translation + (organ.y_dimension / 2);
      const tempZ = organ.placement.z_translation + (organ.z_dimension / 2);

      if (tempX > x) {
        x = tempX;
      }

      if (tempY > y) {
        y = tempY;
      }

      if (tempZ > z) {
        z = tempZ;
      }
    });

    return { x: x * 1.25 / 125, y: y * 1.25 / 125, z : z * 1.25 / 125}
  }

  findMidPoint(coords: Coords3D[]): [number, number, number] {
    let x = 0;
    let y = 0;
    let z = 0;

    coords.forEach(coord => {
      x += coord.x;
      y += coord.y;
      z += coord.z;
    });

    return [x / coords.length, y / coords.length, z / coords.length];
  }

  // TODO: Remove test function
  async test(): Promise<void> {
    const { bodyUI } = this;
    console.log('this: ', this);
    console.log('organs: ', await this.organs$.pipe(take(1)).toPromise());
    console.log('Scene: ', await this.scene$.pipe(take(1)).toPromise());
    const data = await this.data$.pipe(take(1)).toPromise();
    console.log('bodyUI: ', bodyUI);
    if (!data) {
      return;
    }
    console.log('Data: ', data);
  }
}
