/* eslint-disable @angular-eslint/no-output-on-prefix */
import { FilteredSceneService } from './core/services/filtered-scene/filtered-scene.service';
import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BodyUiComponent, GlobalConfigState } from 'ccf-shared';
import { take, tap } from 'rxjs/operators';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

export interface GlobalConfig {
  highlightID?: string;
  zoomToID?: string;
  data?: JsonLdObj[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('bodyUI', { static: true }) readonly bodyUI!: BodyUiComponent;

  @Output() readonly onMouseEnter = new EventEmitter<string>();
  @Output() readonly onMouseLeave = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  readonly data$ = this.configState.getOption('data');
  organs$ = this.sceneSource.filteredOrgans$;
  scene$ = this.sceneSource.filteredScene$.pipe(tap((_) => this.reset()));

  constructor(
    private readonly configState: GlobalConfigState<GlobalConfig>,
    private readonly sceneSource: FilteredSceneService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  private async reset(): Promise<void> {
    const { bodyUI } = this;

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 200));
    const organs = await lastValueFrom(this.organs$.pipe(take(1)));
    const hasZoomingNode =
      !!bodyUI.scene?.find((node) => node.zoomToOnLoad) ?? false;

    bodyUI.rotation = 0;
    bodyUI.rotationX = 0;

    if (!hasZoomingNode) {
      if (organs && organs.length === 1) {
        const { x_dimension: x, y_dimension: y, z_dimension: z } = organs[0];
        bodyUI.bounds = {
          x: (1.25 * x) / 1000,
          y: (1.25 * y) / 1000,
          z: (1.25 * z) / 1000,
        };
        bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
      } else {
        bodyUI.bounds = { x: 2.2, y: 2, z: 0.4 };
        bodyUI.target = [0, 0, 0];
      }
    }

    this.cdr.detectChanges();
  }
}
