import { Component } from '@angular/core';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { ModelState } from './core/store/model.state';
import { SceneState } from './core/store/scene.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccf-organ-info';

  readonly bounds$ = this.model.organDimensions$.pipe(
    map(dims => ({
      x: Math.max(dims.x, this.model.defaultPosition.x + 40) / 1000,
      y: Math.max(dims.y, this.model.defaultPosition.y + 40) / 1000,
      z: Math.max(dims.z, this.model.defaultPosition.z + 40) / 1000
    })),
    distinctUntilKeyChanged('x'),
    distinctUntilKeyChanged('y')
  );

  constructor(
    readonly model: ModelState,
    readonly scene: SceneState,
  ) { }
}
