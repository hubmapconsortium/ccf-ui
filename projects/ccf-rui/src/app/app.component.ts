import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ModelState } from './core/store/model/model.state';
import { RUI_ORGANS } from './core/store/model/model.state';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === undefined ? false : true)
  );

  organList = RUI_ORGANS;

  open = true;

  icon = 'keyboard_arrow_up';

  constructor( readonly model: ModelState ) { }

  toggle(): void {
    this.open = !this.open;
    this.icon = this.open ? 'keyboard_arrow_up': 'keyboard_arrow_down';
  }
}
